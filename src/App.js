import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Component/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Add from './Component/contacts/Addcontact';

import { Provider } from  './context';
import NotFoundPage from './Component/contacts/404'
import  AboutPage from './Component/contacts/Submain';






class App extends Component {
  render() {
      
    
      
    return (
      <Provider>   
       <Router>    
      <div className="App">
   <Header branding ="Trello Clone with React.js" />
   
        
    <div className = "container"> 
   <div className="">       
    
        
<Switch>
<Route exact path = '/About/:main' component={AboutPage} />
<Route exact path = '/' component={Add} />
<Route   component={NotFoundPage} />      
 </Switch>  
    
      
        
   </div>   
     </div>   
   
        
      </div>
      </Router>    
      </Provider>  
    );
  }
}

export default App;
