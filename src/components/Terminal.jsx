import { useEffect, useRef, useState } from 'react'
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
      className="font-mono min-h-full px-2 py-2 text-[16px] leading-[1.15]"
      onClick={() => inputRef.current?.focus()}
    >
      <MerlinBanner />

      <div className="mt-2">
        <span className="text-term-command">Microsoft Merlin</span>
        <span className="text-term-muted"> - your programming companion.</span>
      </div>
      <div className="text-term-muted">How may I help you today? Type /help for commands.</div>

      {history.length > 0 && (
        <div className="mt-2">
          {history.map((entry) =>
            entry.kind === 'input' ? (
              <div key={entry.id} className="whitespace-pre-wrap break-words">
                <span className="text-term-prompt">&gt; </span>
                <span className="text-term-fg">{entry.text}</span>
              </div>
            ) : (
              <Line key={entry.id} text={entry.text} tone={entry.tone} />
            ),
          )}
        </div>
      )}

      <div className="mt-2">
        <PromptInput inputRef={inputRef} onSubmit={handleSubmit} />
      </div>

      <div ref={endRef} />
    </div>
  )
}
