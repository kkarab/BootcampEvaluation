import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';
import studentList from './components/students/StudentList';
import bootcampList from './components/bootcamps/bootcampList';
import LogoutPage from './components/logout/LogoutPage';
import './App.css';




class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          {this.props.currentTeacher && <Link to="/logout">
          <input type="button" value="LOG-OUT"/></Link>
          }
          </header>
          <div>
            <Route exact path="/home" component={FrontPage} />      
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/bootcamps" component={BootcampList} />
            <Route exact path="/bootcamps/:id" component={studentList} />
            <Route exact path="/" render={ () => <Redirect to="/home" /> } />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {return {
  currentTeacher: state.currentTeacher
}}

export default connect(mapStateToProps)(App)
