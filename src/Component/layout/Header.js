import React from 'react';
import { Link }  from 'react-router-dom'

const Header = props => { //Anoda syntax  const Header = ({ branding }) =>
 
    const {branding} = props
    
     return(             // And this is also not needed
         
     <div>
         
    <nav className="navbar navbar-expand-lg navbar-light  bg-warning mb-3 py-0 text-success">     
      
    <div className = "container">     
         
    <a className="navbar-brand" href=""> {branding} </a>     

      
      </div>   
         
    </nav>     
        
     </div>
         
     );      
    
};

export default Header