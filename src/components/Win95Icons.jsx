/*
  Tiny pixel-style SVG icons for the Windows 95 MS-DOS Prompt chrome.
  All drawn on a 16x16 grid with crisp edges, black on transparent.
*/

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  shapeRendering: 'crispEdges',
  'aria-hidden': true,
}

export function MsDosIcon() {
  return (
    <svg {...base} width={16} height={16}>
      <rect x="1" y="2" width="14" height="10" fill="#c0c0c0" stroke="#000" />
      <rect x="2" y="3" width="12" height="8" fill="#000080" />
      <rect x="3" y="4" width="2" height="1" fill="#fff" />
      <rect x="3" y="6" width="5" height="1" fill="#fff" />
      <rect x="3" y="8" width="4" height="1" fill="#fff" />
      <rect x="5" y="12" width="6" height="1" fill="#000" />
      <rect x="3" y="13" width="10" height="1" fill="#808080" />
    </svg>
  )
}

export function MerlinIcon() {
  return (
    <svg {...base} width={16} height={16}>
      <polygon points="8,1 14,13 2,13" fill="#000080" stroke="#000" />
      <rect x="1" y="13" width="14" height="2" fill="#000080" stroke="#000" />
      <rect x="7" y="4" width="1" height="3" fill="#ffd700" />
      <rect x="6" y="5" width="3" height="1" fill="#ffd700" />
      <rect x="9" y="8" width="1" height="2" fill="#ffd700" />
      <rect x="5" y="10" width="1" height="1" fill="#ffd700" />
    </svg>
  )
}

export function MinimizeGlyph() {
  return (
    <svg {...base} width={12} height={12} viewBox="0 0 12 12">
      <rect x="2" y="8" width="6" height="2" fill="#000" />
    </svg>
  )
}

export function MaximizeGlyph() {
  return (
    <svg {...base} width={12} height={12} viewBox="0 0 12 12">
      <rect x="1" y="1" width="10" height="9" fill="none" stroke="#000" strokeWidth="1" />
      <rect x="1" y="1" width="10" height="3" fill="#000" />
    </svg>
  )
}

export function RestoreGlyph() {
  return (
    <svg {...base} width={12} height={12} viewBox="0 0 12 12">
      <rect x="4" y="1" width="7" height="6" fill="#fff" stroke="#000" />
      <rect x="4" y="1" width="7" height="2" fill="#000" />
      <rect x="1" y="4" width="7" height="6" fill="#fff" stroke="#000" />
      <rect x="1" y="4" width="7" height="2" fill="#000" />
    </svg>
  )
}

export function CloseGlyph() {
  return (
    <svg {...base} width={12} height={12} viewBox="0 0 12 12">
      <path
        d="M2 2 L9 9 M9 2 L2 9"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="butt"
      />
    </svg>
  )
}

export function MarkIcon() {
  return (
    <svg {...base}>
      <rect
        x="2"
        y="3"
        width="12"
        height="10"
        fill="none"
        stroke="#000"
        strokeWidth="1"
        strokeDasharray="1 1"
      />
    </svg>
  )
}

export function CopyIcon() {
  return (
    <svg {...base}>
      <rect x="2" y="2" width="8" height="10" fill="#fff" stroke="#000" />
      <rect x="6" y="5" width="8" height="9" fill="#fff" stroke="#000" />
    </svg>
  )
}

export function PasteIcon() {
  return (
    <svg {...base}>
      <rect x="2" y="3" width="12" height="11" fill="#c08a4a" stroke="#000" />
      <rect x="5" y="1" width="6" height="3" fill="#fff" stroke="#000" />
      <rect x="4" y="6" width="8" height="6" fill="#fff" stroke="#000" />
    </svg>
  )
}

export function FullscreenIcon() {
  return (
    <svg {...base}>
      <rect x="1" y="2" width="14" height="11" fill="#000080" stroke="#000" />
      <rect x="3" y="4" width="10" height="2" fill="#fff" />
    </svg>
  )
}

export function PropertiesIcon() {
  return (
    <svg {...base}>
      <rect x="2" y="1" width="12" height="13" fill="#fff" stroke="#000" />
      <rect x="2" y="1" width="12" height="3" fill="#000080" />
      <path d="M4 9 L6 11 L11 6" fill="none" stroke="#008000" strokeWidth="2" />
    </svg>
  )
}

export function BackgroundIcon() {
  return (
    <svg {...base}>
      <rect x="1" y="1" width="10" height="9" fill="#fff" stroke="#000" />
      <rect x="5" y="6" width="10" height="9" fill="#c0c0c0" stroke="#000" />
      <rect x="5" y="6" width="10" height="2" fill="#000080" />
    </svg>
  )
}

export function FontIcon() {
  return (
    <svg {...base}>
      <text
        x="8"
        y="13"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Times New Roman, serif"
        fill="#000"
      >
        A
      </text>
    </svg>
  )
}
