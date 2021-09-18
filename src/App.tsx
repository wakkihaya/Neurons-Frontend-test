import React from 'react'
import ReactDOM from 'react-dom'
import Cast from './pages/Cast/Cast'
import Episode from './pages/Episodes/Episodes'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Cast />
          </Route>
          <Route exact path="/cast">
            <Cast />
          </Route>
          <Route exact path="/episodes">
            <Episode />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
