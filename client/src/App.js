import React from 'react';
import './App.css';
import Create from './component/create';
import Home from './component/home';
import Signin from './component/signin';
import Signup from './component/signup';
import { BrowserRouter , Route ,Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      
    <Route path={"/"} exact><Signin /></Route>
    <Route path={"/signup"} ><Signup /></Route>
    <Route path={"/create"} ><Create /></Route>
    <Route path={"/home"} ><Home /></Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App;
