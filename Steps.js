BIOLER PLATE : CONTACT MANAGER


ADD MAIN  : Addcontact.js 



-user sees a div  clicks on the div then a form appear , bring in consumer  , when you save you update the mainItems in state in context, persist saved in items to local storage , in the componenetWillMount Of Provider fetch it out for use  , the items saved  apears as small  div below the form , implement the ability to delete  any mainitems from state in context / Local Storage 


​​​​​​​​​​​​​​​​​​​​​​​​​​​/// fetch it out for use

 componentWillMount() {
 const itemsInArray =  localStorage.getItem( 'Trellomain');  
 if (itemsInArray){
 var list =  localStorage.getItem( 'Trellomain')     
 list = JSON.parse(list);
this.setState(state => ({ mainItems : list}))

}    

  }

  componentWillUpdate(nextProps, nextState) { 
 localStorage.setItem( 'Trellomain', JSON.stringify(nextState.mainItems)); 
  }


​​​​​​​​​​​​​​​​​​​​​​​​​​​​//// the items saved  apears as small  div below the form

<Consumer>
{  value =>{
      
 const { dispatch , mainItems } = value;

     const eachPostItem = mainItems.map( (each , index)  => (
           <div key={index} className ="xoxo">
        <Link to =`/About/${each.main}>  //     ``Back ticks make my code orage
        <i className="fas fa-trash-alt" onClick={this.deleteMain.bind(this , each.id ,  dispatch )}></i>
        <h3>{each.main}</h3>
        </Link>
      </div>
    ));
 

{eachPostItem}   // Brad Style




​​​​​​​​​​​​​​​​​​​​​​​​​​​​//// Delete    , depends on componentWillUpdate to persist after delete

deleteMain = (id ,   dispatch) => {
dispatch({type : 'DELETE_MAIN' , payload : id })    
}


<i className="fas fa-trash-alt" onClick={this.deleteMain.bind(this , each.id ,  dispatch )}></i>




​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ div below the form on click should route : Similar to wesBos ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​




(1)  Make the div  a link    from react-router-dom

//APP.JS
<Switch>
<Route exact path = '/About/:main' component={AboutPage} />

///
      <div key={index} className ="xoxo">
        <Link to ={`/About/${each.main}>   //  use full backticks
        <i className="fas fa-trash-alt" onClick={this.deleteMain.bind(this , each.id ,  dispatch )}></i>
        <h3>{each.main}</h3>
        </Link>
      </div>
    ));

(2) Persisting the Div(Addcontact) so that on page refresh it still exist


On submit we dispatch an action to context where our State exist , componentDidUpdate in context gets triggered this is a good place to set the Items 2 local Storage





//context.js
 componentWillUpdate(nextProps, nextState) { 
localStorage.setItem( 'Trellomain', JSON.stringify(nextState.mainItems)); 
  }



 componentWillMount() { 

 const itemsInArray_Trellomain =  localStorage.getItem( 'Trellomain');  
      
 if (itemsInArray_Trellomain){
 var list_Trellomain =  localStorage.getItem( 'Trellomain')     
 list_Trellomain = JSON.parse(list_Trellomain);
this.setState(state => ({ mainItems : list_Trellomain}))
}        
     
     
  }



All Add contact needs to do is to fetch state from context Api



////////////////////////////////////SAVING ITEMS FOR A SPECIFIC URL ////////////////////////////////////////////////////////////////
////////////////////// USING  LOCAL STORAGETO PERSIT IN TRELLO CLONE  RATHER THAN FIREBASE ///////////////////////////
 


IMPORTANT!!! : WE SAVE PER URL     , JUST LIKE WES BOS FISHES(FIREBASE) AND ORDER(LOCALSTORAGE)

AND THIS IS NOT POSSIBLE WHEN USING STATE MANAGEMENT , ONLY APP LEVEL STATE   COS I CAN'T  ACEESS THIS.PROPS.MATCH  INSIDE THE CONTEXT API  BUT  APP LEVEL  I CAN ACCESS ,(WES BOS) THE PAGE /COMPONENET WITH THE NEEDED URL IS ALSO THE PAGE /COMPONENT WHERE THE STATE IS 
 
AND AS SUCH WE CAN DO : localstorage.setItem( this.props.params.match ,  the state )


             ===================================WORK AROUND============================
save all subITEMS created by every usey in a single array but each object saved has the url it came from     ****

///Submain.js  
handleSubmit = ( dispatch , e ) => {
    e.preventDefault();
   const Data = { SUBITEMS : this.state.SUBITEMS  , id : Date.now()  , url : this.props.match.params.main}   *******
   dispatch({ type : 'ADD_TO_SUBITEMS' ,  Data })
    this.setState(( state ) => ({ SUBITEMS  : "" }) );   
       
}

/////Context.js

 state = {
        
        mainItems : [ ] ,  
      
        SUBITEMS     :  [ ] ,  //case 'ADD_TO_SUBITEMS' :  return { ... state  ,   SUBITEMS : [  ...state.SUBITEMS , action.Data  ] }
 
      
        dispatch : (action) =>  this.setState( state => reducer(state , action ))  
  
         };



  ///////

componentWillUpdate(nextProps, nextState) { 

       localStorage.setItem( 'Trellomain', JSON.stringify(nextState.mainItems)); 
       localStorage.setItem(  'default' , JSON.stringify(nextState.SUBITEMS)); 
   
  }

//////




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


///////////  displaying for each usser with the help of filter   Submain.js



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
       


{eachPostItem}


    
