import React, { Component } from 'react';

const Context = React.createContext();


const reducer = ( state , action )=>{

switch (action.type) {
case 'DELETE_MAIN':  return { ...state , mainItems : state.mainItems.filter( each => each.id !== action.payload )  }
    
case 'ADD_MAIN' : return  { ...state ,  mainItems : [ ...state.mainItems , action.Data  ] }
        
case 'ADD_TO_SUBITEMS' :  return { ... state  ,   SUBITEMS : [  ...state.SUBITEMS , action.Data  ] }
 
default : return state;
  }
} 
  



 export   class Provider extends Component{
     
       
  state = {
        
        mainItems : [ ] ,  
      
        SUBITEMS     :  [ ] ,
      
        dispatch : (action) =>  this.setState( state => reducer(state , action ))  
  
         };



componentWillUpdate(nextProps, nextState) { 

       localStorage.setItem( 'Trellomain', JSON.stringify(nextState.mainItems)); 
       localStorage.setItem(  'default' , JSON.stringify(nextState.SUBITEMS)); 
   
  }



   

 componentWillMount() { 

 const itemsInArray_Trellomain =  localStorage.getItem( 'Trellomain');  
  
var  Array_of_All_sub_items_created_by_everyOne =  localStorage.getItem( 'default');  
        
     
     
 if (itemsInArray_Trellomain){
 var list_Trellomain =  localStorage.getItem( 'Trellomain')     
 list_Trellomain = JSON.parse(list_Trellomain);
this.setState(state => ({ mainItems : list_Trellomain}))
}        
   
if (Array_of_All_sub_items_created_by_everyOne){
     
 Array_of_All_sub_items_created_by_everyOne = JSON.parse(Array_of_All_sub_items_created_by_everyOne);
this.setState(state => ({  SUBITEMS : Array_of_All_sub_items_created_by_everyOne }))
} 
     
  }




    
     
render(){
    
return (
    <Context.Provider  value = {this.state}>
   {this.props.children}
   
     </Context.Provider>
     );    
    
}
     
    
     
}

export const  Consumer  = Context.Consumer; 