
import React, { Component } from 'react';
import  { Consumer } from   '../../context';


class AboutPage extends Component{
    
    
  
state = {
     SUBITEMS    : "",
  
     };    
    
 
handleChange = (e) =>  this.setState ({ [e.target.name] : e.target.value });
   
    
handleSubmit = ( dispatch , e ) => {
    e.preventDefault();
    
    const Data = { SUBITEMS : this.state.SUBITEMS  , id : Date.now()  , url : this.props.match.params.main}
 

dispatch({ type : 'ADD_TO_SUBITEMS' ,  Data })
    this.setState(( state ) => ({ SUBITEMS  : "" }) );   
       
}
     
            
    
    
render(){  
    
     const { SUBITEMS  } = this.state;
    
    
return(

<Consumer>
{  value =>{
 
const idInUrl = this.props.match.params.main 
       
const { dispatch ,   SUBITEMS :  SUBITEMS_RENAMED  } = value;
 
const subitems_For_Current_Url   = SUBITEMS_RENAMED.filter( each => each.url === idInUrl )
  
console.log(subitems_For_Current_Url)
    
   const eachPostItem = subitems_For_Current_Url.map( (each , index)  => (
     
     
      <div key={index} className ="xoxo">
        
      
        <h3>{each.SUBITEMS}</h3>
       
      </div>
    ));
        
    
    
    
     return (
    
  <React.Fragment>    
             
<div className="xoxo">
<h3>{this.props.match.params.main}</h3>  
</div>

 <div className = "form_container2 mb-5">      
      
     <form onSubmit={this.handleSubmit.bind(this , dispatch )}>
   
    <div className="form-group">
    <label htmlFor="name"> Add A list:</label>
    <input 
    type = "text"
    name = "SUBITEMS"
    className="form-control" 
    autoComplete = "off"  
    placeholder = "Create New list"
    value={SUBITEMS}
    onChange={this.handleChange}/>
     </div>  
      
 
  
 <button type="submit" className=" ml-5 btn btn-warning">Create</button>

    
</form>
     

 </div>

{eachPostItem}


</React.Fragment>

             )}
  }
 </Consumer>
    
    
);   
    
}    
    
    
    
    
}






export default AboutPage;

    