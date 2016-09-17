/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    ButtonGroup
} from 'react-bootstrap'

export default class Welcome extends React.Component {
    constructor(props){
        super(props);
        
    }
    
      static contextTypes = {
        router: React.PropTypes.object
    };

    goToAdmin(){
     this.context.router.push("/admin");
 }
 
 render(){
     const wellStyle={
         width:500,
         height:500,
         marginLeft:'auto',
         marginTop:'50px',
         marginRight:'auto'
     };

        return (

            <div className="container">
            <Well style={wellStyle}>
             <legend>Please LogIn</legend>
         <form>
         <FormGroup>
         <ControlLabel>Enter Username</ControlLabel>
         <FormControl
         type="text"
         placeholder="Enter your username"
         />
         <FormControl.Feedback/>
         <HelpBlock></HelpBlock>
         </FormGroup>
         
         <FormGroup>
         <ControlLabel>Enter Password</ControlLabel>
         <FormControl
         type="password"
         placeholder="Enter your password"
         />
         <FormControl.Feedback/>
         <HelpBlock></HelpBlock>
         </FormGroup>
         
        <div className="btncontainer">
        <ButtonGroup>
         <Button bsStyle="success" type="submit" onClick={this.goToAdmin.bind(this)}>Login</Button>
          </ButtonGroup>
          </div>
         </form>
         </Well>
        </div>
         
     );
 }
 
            
}