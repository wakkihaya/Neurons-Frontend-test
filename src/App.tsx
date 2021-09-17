import React from 'react'
import ReactDOM from 'react-dom'
import './styles/app.scss'
import Cast from './pages/Cast/Cast'

export const App: React.FC = () => {
  return (
    <>
      <Cast />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
