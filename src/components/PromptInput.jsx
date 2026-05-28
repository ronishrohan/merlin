import { useEffect, useState } from 'react'

/*
  Terminal-style prompt. The real <input> is transparent and overlays the
  prompt line; the visible line (prompt + typed text + blinking block cursor)
  is rendered manually for an authentic TTY feel. The parent focuses `inputRef`
  on click so the whole screen area behaves like a console.
*/
export default function PromptInput({ inputRef, onSubmit }) {
  const [value, setValue] = useState('')
  const placeholder = 'hi'

  useEffect(() => {
    inputRef?.current?.focus()
  }, [inputRef])

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(value)
      setValue('')
    }
  }

  return (
    <div className="relative whitespace-pre-wrap break-words">
      <span className="text-term-prompt">&gt; </span>
      {value === '' ? (
        <>
          <span className="term-cursor-char">{placeholder.charAt(0)}</span>
          <span className="text-term-muted">{placeholder.slice(1)}</span>
        </>
      ) : (
        <>
          <span className="text-term-fg">{value}</span>
          <span className="term-cursor" />
        </>
      )}

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="terminal input"
        className="absolute inset-0 h-full w-full bg-transparent text-transparent"
      />
    </div>
  )
}
