import Win95Window from './components/Win95Window'
import Terminal from './components/Terminal'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-win95-desktop">
      <Win95Window title="Merlin">
        <Terminal />
      </Win95Window>
    </div>
  )
}
