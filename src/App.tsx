import React from 'react'
import ReactDOM from 'react-dom'
import './styles/app.scss'

export const App: React.FC = () => {
  return (
    <>
      <div className="App">App</div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
