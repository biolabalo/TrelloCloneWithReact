import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  { Consumer } from   '../../context';
import { Link}  from 'react-router-dom';

class Contact extends Component {
 
 state = { isShow : true };

  toggle = () => {
  this.setState({ isShow : !this.state.isShow})
  }
  
 deleteComponent = (  id , dispatch ) =>  {
     dispatch( { type : 'DELETE_CONTACT', payload : id } )
     


      //////////////////////////////    DELETE : PLACE IN DELETE LOGIC //////////////////////////////   
      
 var arrayInLs =  localStorage.getItem( 'contactManager')     
 arrayInLs = JSON.parse(arrayInLs);     
 let newArray  =     arrayInLs.filter( each => each.id !== id )  // ID === ID OF CLICKED ITEM

 localStorage.setItem( 'contactManager' , JSON.stringify(  newArray  )  )    
      
//////////////////////////////    DELETE  //////////////////////////////
   
 }

    
  render (){

const  {  isShow }  = this.state;      
const  { Artificial_key : id , name ,  email ,  phone }   = this.props;

      
    return (
        
  <Consumer>
{  value =>{
    
     const {   dispatch }  = value;
      
        return (
    
<div className="card-body text-center">
         
<h1> {name}  <i onClick={this.toggle} className="fas fa-toggle-on"></i> </h1>
 
        { isShow ? ( <ul className="list">
          <li className = ""> {email} </li>
          <li className = "" >  {phone} </li>
    </ul>
          ) : null }

<button type="button" className ="btn btn-warning" onClick={this.deleteComponent.bind(this , id , dispatch)}> Delete </button>

 <button type="button" className ="btn btn-warning ml-4"> <Link to={`contact/edit/${id}`}> Edit </Link>  </button>


</div>        
     
             )
  }
  
  
  }
 </Consumer>      

    
        );  
      
  }    
};

Contact.propTypes = {
  name: PropTypes.string,
  email:PropTypes.string.isRequired, 
};

export default Contact;

