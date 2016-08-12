import React from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock} from 'react-bootstrap'
import '../styles/bootstrap.css'

class Home extends React.Component{
    constructor(props){
       super(props);
   }
   
     render(){
     
         const wellStyle={
            width: 700,
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 50
          }
            
        return(
        <div classname="container">
         <Well style={wellStyle}>
         <legend>Please Register</legend>
         <form>
         <FormGroup validationState={this.getClasses('firstName')}>
         <ControlLabel>First Name</ControlLabel>
         <FormControl
            type="text"
            name="firstname"
            placeholder="Enter your first name"
           />
            <FormControl/>
            <HelpBlock></HelpBlock>
            </FormGroup>
         </form>
         
         </Well>
         </div>
            );
     }
}     



export default (Home);