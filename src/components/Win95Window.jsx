import { useEffect, useRef, useState } from 'react'
import {
  CloseGlyph,
  MaximizeGlyph,
  MerlinIcon,
  MinimizeGlyph,
  RestoreGlyph,
} from './Win95Icons'

const NORMAL_W = 'min(960px, 92vw)'
const NORMAL_H = 'min(680px, 86vh)'
const LINE_PX = 16 // terminal line height; all scrolling snaps to whole lines

function TitleButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label}
      onClick={onClick}
      className="win95-btn flex h-[16px] w-[18px] items-center justify-center"
    >
      {children}
    </button>
  )
}

function TitleBar({ title, maximized, onToggleMaximize, onPointerDown }) {
  return (
    <div
      onPointerDown={onPointerDown}
      onDoubleClick={onToggleMaximize}
      className="flex shrink-0 cursor-default select-none items-center gap-1 bg-win95-title px-[2px] py-[2px]"
    >
      <span className="flex h-4 w-4 items-center justify-center">
        <MerlinIcon />
      </span>
      <span className="font-ui flex-1 truncate px-1 text-[13px] font-bold leading-none text-win95-titletext">
        {title}
      </span>
      <div className="flex items-center gap-[2px]">
        <TitleButton label="Minimize">
          <MinimizeGlyph />
        </TitleButton>
        <TitleButton
          label={maximized ? 'Restore' : 'Maximize'}
          onClick={onToggleMaximize}
        >
          {maximized ? <RestoreGlyph /> : <MaximizeGlyph />}
        </TitleButton>
        <TitleButton label="Close">
          <CloseGlyph />
        </TitleButton>
      </div>
    </div>
  )
}

// Menu label with the classic underlined access-key (first letter).
function Menu({ label }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      className="px-2 py-[1px] text-[13px] leading-none text-black hover:bg-win95-title hover:text-win95-titletext"
    >
      <span className="underline">{label.charAt(0)}</span>
      {label.slice(1)}
    </button>
  )
}

function MenuBar() {
  return (
    <div className="font-ui flex shrink-0 select-none items-center bg-win95-face px-[2px] py-[1px]">
      <Menu label="File" />
      <Menu label="Edit" />
      <Menu label="View" />
      <Menu label="Conversation" />
      <Menu label="Help" />
    </div>
  )
}

function StatusPanel({ children, className = '' }) {
  return (
    <div
      className={`win95-statuspanel flex items-center px-2 py-1 text-[11px] leading-none text-black ${className}`}
    >
      {children}
    </div>
  )
}

function StatusBar({ status }) {
  return (
    <div className="font-ui flex shrink-0 select-none items-stretch gap-[2px] bg-win95-face px-[2px] py-[2px]">
      <StatusPanel className="flex-1">{status}</StatusPanel>
      <StatusPanel className="w-[110px]">Microsoft Merlin</StatusPanel>
      <StatusPanel className="w-[80px]">Connected</StatusPanel>
    </div>
  )
}

// Keep an x/y top-left fully inside the viewport for a window of size w/h.
function clampToViewport(x, y, w, h) {
  return {
    x: Math.min(Math.max(0, x), Math.max(0, window.innerWidth - w)),
    y: Math.min(Math.max(0, y), Math.max(0, window.innerHeight - h)),
  }
}

export default function Win95Window({ title, status = 'Ready', children }) {
  const windowRef = useRef(null)
  const scrollRef = useRef(null)
  const [pos, setPos] = useState(null) // {x,y} in viewport px; null = centered
  const [maximized, setMaximized] = useState(false)
  const [outline, setOutline] = useState(null) // {x,y,w,h} while dragging

  // Stepped, non-smooth scrolling (terminal feel): jump whole lines per notch.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const LINE = LINE_PX
    const NOTCH = 90
    const STEP = LINE * 3
    let acc = 0
    const onWheel = (e) => {
      e.preventDefault()
      acc += e.deltaMode === 1 ? e.deltaY * LINE : e.deltaY
      while (Math.abs(acc) >= NOTCH) {
        el.scrollTop += Math.sign(acc) * STEP
        acc -= Math.sign(acc) * NOTCH
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Make native scrollbar interactions (arrow buttons, thumb drag, track click)
  // step too: snap scrollTop to whole lines instead of smooth scrolling. The
  // near-bottom guard keeps the last line / prompt fully reachable.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      if (max - el.scrollTop < LINE_PX) return
      let snapped = Math.round(el.scrollTop / LINE_PX) * LINE_PX
      if (snapped < 0) snapped = 0
      if (snapped > max) snapped = max
      if (Math.abs(snapped - el.scrollTop) >= 1) el.scrollTop = snapped
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  function startDrag(e) {
    if (maximized || e.button !== 0) return
    if (e.target.closest('button')) return
    e.preventDefault()
    const rect = windowRef.current.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    const offX = e.clientX - rect.left
    const offY = e.clientY - rect.top

    const at = (ev) => clampToViewport(ev.clientX - offX, ev.clientY - offY, w, h)
    setOutline({ ...clampToViewport(rect.left, rect.top, w, h), w, h })

    const move = (ev) => setOutline({ ...at(ev), w, h })
    const up = (ev) => {
      const final = at(ev)
      setPos({ x: final.x, y: final.y })
      setOutline(null)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  let style
  if (maximized) {
    style = { left: 0, top: 0, width: '100vw', height: '100vh' }
  } else if (pos) {
    style = { left: pos.x, top: pos.y, width: NORMAL_W, height: NORMAL_H }
  } else {
    style = {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: NORMAL_W,
      height: NORMAL_H,
    }
  }

  return (
    <>
      <div
        ref={windowRef}
        style={style}
        className="win95-raised fixed flex flex-col p-[3px]"
      >
        <TitleBar
          title={title}
          maximized={maximized}
          onToggleMaximize={() => setMaximized((m) => !m)}
          onPointerDown={startDrag}
        />
        <MenuBar />
        <div className="win95-sunken mt-[2px] min-h-0 flex-1 overflow-hidden p-[2px]">
          <div ref={scrollRef} className="win95-scroll h-full overflow-y-auto bg-term-bg">
            {children}
          </div>
        </div>
        <StatusBar status={status} />
      </div>

      {outline && (
        <div
          className="drag-outline"
          style={{
            left: outline.x,
            top: outline.y,
            width: outline.w,
            height: outline.h,
          }}
        />
      )}
    </>
  )
}
