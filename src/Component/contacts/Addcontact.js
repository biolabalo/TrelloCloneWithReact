import React, { Component } from 'react';
import  { Consumer } from   '../../context';
import { Link }  from 'react-router-dom';
class Add extends Component{
    
    
state = {
     name   : "",
     isHiddenForm : true 
     };    


showForm = (e) =>{
 e.stopPropagation();
 this.setState(state => ({ isHiddenForm : false }))   
}

hideForm =(e)=>{
 e.stopPropagation();
 this.setState( state => ({ isHiddenForm : !this.state.isHiddenForm })) ;
 this.setState(( state ) => ({ name : "" }) );   
}

handleChange = (e) =>  this.setState ({ [e.target.name] : e.target.value });


 


handleSubmit = ( dispatch , e ) => {
e.preventDefault();
const Data = { main : this.state.name , id : Date.now() }
dispatch( { type : 'ADD_MAIN' , Data } );
this.setState(( state ) => ({ name : "" }) );   
}
    


deleteMain = (id ,   dispatch) => {
dispatch({type : 'DELETE_MAIN' , payload : id })    
}






render() {

    const { name ,  isHiddenForm } = this.state;
    
return (


<Consumer>
{  value =>{
      
 const { dispatch , mainItems } = value;

    

     const eachPostItem = mainItems.map( (each , index)  => (
     
     
      <div key={index} className ="xoxo">
        <Link to = {`/About/${each.main}`}> 
        <i className="fas fa-trash-alt" onClick={this.deleteMain.bind(this , each.id ,  dispatch )}></i>
        <h3>{each.main}</h3>
        </Link>
      </div>
    ));
    
       return (
    
  <React.Fragment>    
             
 <div className = "form_container mb-5" onClick ={this.showForm}>      
      <h3> Create New Board </h3>
           
   { isHiddenForm ?  null :  ( 
       
     <form onSubmit={this.handleSubmit.bind(this , dispatch )}>
   
    <div className="form-group">
    <label htmlFor="name"> What Shall will call this board:</label>
    <input 
    type = "text"
    name = "name"
    className="form-control" 
    autoComplete = "off"  
    placeholder = "Create New Board"
    value={name}
    onChange={this.handleChange}/>
     </div>  
      
                  
      
<button type="submit" className=" ml-5 btn btn-warning"onClick={this.hideForm}>Cancel</button>
  
  
 <button type="submit" className=" ml-5 btn btn-warning">Create Board</button>

    
</form>
          
       )}
    


 </div>

{eachPostItem}

</React.Fragment>

             )}
  }
 </Consumer>
    

);
  

}    
}


export default Add;

