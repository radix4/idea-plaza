import React from 'react'
import LoginPage from './components/LoginPage'
import RegistrationPage from './components/RegistrationPage'
import HomePage from './components/HomePage'
import IdeaPage from './components/IdeaPage'
import IdeaEditor from './components/IdeaEditor'
import Profile from './components/Profile'
import ProfileEditor from './components/ProfileEditor'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* On Boot */}
          <Route path='/' exact component={HomePage} />
          {/* Other Site */}
          <Route path='/Login' component={LoginPage} />
          <Route path='/Registration' component={RegistrationPage} />
          <Route path='/IdeaPage/:ideaID' component={IdeaPage} />
          <Route path='/IdeaEditor/:ideaID' component={IdeaEditor} />
          <Route path='/Profile/:ideaID' component={Profile} />
          <Route path='/ProfileEditor' component={ProfileEditor} />
          {/* Error Case */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  )
}

export default App
