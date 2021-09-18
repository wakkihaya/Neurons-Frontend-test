import React from 'react'
import ReactDOM from 'react-dom'
import Cast from './pages/Cast/Cast'
import Episode from './pages/Episodes/Episodes'

export const App: React.FC = () => {
  return (
    <>
      <Episode />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
