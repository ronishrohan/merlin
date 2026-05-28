const ASCII = String.raw`
███    ███ ███████ ██████  ██      ██ ███    ██
████  ████ ██      ██   ██ ██      ██ ████   ██
██ ████ ██ █████   ██████  ██      ██ ██ ██  ██
██  ██  ██ ██      ██   ██ ██      ██ ██  ██ ██
██      ██ ███████ ██   ██ ███████ ██ ██   ████
`

export default function MerlinBanner() {
  return (
    <pre
      aria-label="Merlin"
      className="select-none overflow-x-auto whitespace-pre text-[10px] leading-tight text-term-fg sm:text-sm md:text-base"
    >
      {ASCII}
    </pre>
  )
}
