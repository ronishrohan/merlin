const ASCII = `███    ███ ███████ ██████  ██      ██ ███    ██
████  ████ ██      ██   ██ ██      ██ ████   ██
██ ████ ██ █████   ██████  ██      ██ ██ ██  ██
██  ██  ██ ██      ██   ██ ██      ██ ██  ██ ██
██      ██ ███████ ██   ██ ███████ ██ ██   ████`

export default function MerlinBanner() {
  return (
    <pre
      aria-label="Merlin"
      className="m-0 select-none whitespace-pre leading-none text-term-fg"
    >
      {ASCII}
    </pre>
  )
}
