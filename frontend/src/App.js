import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {LoginPage} from './LoginPage'
import { Register } from "./Register";
import {BankingPage} from "./BankingPage"
import { callBackend } from "./api";



export class App extends React.Component {

  constructor() {
    super();
    this.state = {}
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    
  }

  onLogin(){
    this.setState({message:'Logged in'})

  }

  onLogout(){
    this.setState({message:'Logged out'})
  }

  async componentDidMount() {

    try{
      await callBackend('users/checkLogin','GET',{})
      this.setState({message:'Logged in'})
    }

    catch{
      this.setState({message:'Logged out'})
    }
  }
  
  render() {

    const loggedIn = this.state.message

    if(!loggedIn){
      return null
    }

    else if(loggedIn==='Logged out'){
      return(
        <Router>
          <Switch>
            <Route path = '/Login'>
                <LoginPage onLogin={this.onLogin}/>
            </Route>
            <Route path='/Register'>
              <Register/>
            </Route>
            <Route path = '/'>
                <LoginPage onLogin={this.onLogin}/>
            </Route>
          </Switch>
        </Router>
      )
      
    }

    else {
      return(
        <Router>
          <Switch>
            <Route path = '/BankingPage'>
              <BankingPage onLogout={this.onLogout}/>
            </Route>
            <Route path="/">
              <BankingPage onLogout={this.onLogout}/>
            </Route>
          </Switch>
        </Router>
      )
    }
  }
}

export default App;


