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

 class LogIn extends React.Component {
    constructor(props){
        super(props);
        
    }
    
      static contextTypes = {
        router: React.PropTypes.object
    };


 render(){
     const wellStyle={
         width:500,
         height:400,
         marginLeft:'auto',
         marginTop:'50px',
         marginRight:'auto'
     };

        return (

            <div className="container">
            <Well style={wellStyle}>
             <legend>Please LogIn</legend>
         <form>
             {this.props.auth.isWrongCredentials ?
                 <Alert bsStyle="danger">Wrong Credentials</Alert>
                 :null}
             {this.props.auth.logoutSuccess ?
                 <Alert bsStyle="success">You are now logged-out</Alert>
                 :null}
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
         <Button bsStyle="success" type="submit">Login</Button>
          </ButtonGroup>
          </div>
         </form>
         </Well>
        </div>
         
     );
 }
 
            
}

function mapStateToProps(state) {
    return {
        auth:state.auth
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogIn);

function mapStateToProps(state) {
    return {
        auth:state.auth
    }
}


function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions:bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogIn);