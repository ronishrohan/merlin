import { Fragment, useEffect, useRef, useState } from 'react'
import MerlinBanner from './MerlinBanner'
import PromptInput from './PromptInput'
import { runCommand } from '../lib/commands'

const TONE_CLASS = {
  fg: 'text-term-fg',
  muted: 'text-term-muted',
  accent: 'text-term-accent',
  command: 'text-term-command',
  path: 'text-term-path',
  prompt: 'text-term-prompt',
  error: 'text-term-error',
  info: 'text-term-info',
}

function Line({ text, tone }) {
  const cls = TONE_CLASS[tone] ?? TONE_CLASS.fg
  return <div className={`whitespace-pre-wrap break-words ${cls}`}>{text || ' '}</div>
}

// A literal blank terminal row. Vertical spacing in this view is expressed as
// real empty lines, never CSS margins/padding/gaps.
const Blank = () => <div className="whitespace-pre-wrap">{' '}</div>

let counter = 0
const uid = () => `e${counter++}`

export default function Terminal() {
  const [history, setHistory] = useState([])
  const inputRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  function handleSubmit(raw) {
    const value = raw.trim()
    if (!value) return

    const echo = { id: uid(), kind: 'input', text: value }
    const result = runCommand(value)

    if (result.action?.type === 'clear') {
      setHistory([])
      return
    }

    const output = (result.lines ?? []).map((l) => ({
      id: uid(),
      kind: 'output',
      ...l,
    }))
    setHistory((h) => [...h, echo, ...output])
  }

  return (
    <div
      className="term-screen font-mono min-h-full text-[16px] leading-none"
      onClick={() => inputRef.current?.focus()}
    >
      <Blank />
      <MerlinBanner />
      <Blank />
      <div className="whitespace-pre-wrap break-words">
        <span className="text-term-command">Microsoft Merlin</span>
        <span className="text-term-muted"> - your programming companion.</span>
      </div>
      <div className="whitespace-pre-wrap break-words text-term-muted">
        How may I help you today? Type /help for commands.
      </div>

      {history.map((entry, i) => {
        const isInput = entry.kind === 'input'
        // One blank line before every message (each user echo and the start of
        // a Merlin reply) so the spacing matches the gap above the prompt.
        const showBlank = isInput || history[i - 1]?.kind === 'input'
        return (
          <Fragment key={entry.id}>
            {showBlank && <Blank />}
            {isInput ? (
              <div className="whitespace-pre-wrap break-words">
                <span className="text-term-prompt">&gt; </span>
                <span className="text-term-fg">{entry.text}</span>
              </div>
            ) : (
              <Line text={entry.text} tone={entry.tone} />
            )}
          </Fragment>
        )
      })}

      <Blank />
      <PromptInput inputRef={inputRef} onSubmit={handleSubmit} />

      <div ref={endRef} />
    </div>
  )
}
