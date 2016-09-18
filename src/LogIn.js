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
    ButtonGroup,
    Alert
} from 'react-bootstrap'
import * as HealthChecksAction from './actions/healthchecks';
import * as authactions  from './actions/authactions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux'


 class LogIn extends React.Component {
    constructor(props){
        super(props);
        
    }

     state={
         "j_username":null,
         "j_password":"",
         "remember-me":false,
         validated:false
     };
     updateField= (name,value)=>{
         var data = {};
         data[name]=value;

         this.setState(data);
     };



     static contextTypes = {
        router: React.PropTypes.object
    };

     onFormSubmit=(event)=>{
         event.preventDefault();
         this.props.authActions.login(this.state, this.props.location.query.targetPath || "/");
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
                    <form onSubmit={this.onFormSubmit}>
                        {this.props.auth.isWrongCredentials ?
                            <Alert bsStyle="danger">Wrong Credentials</Alert>
                            : null}
                        {this.props.auth.logoutSuccess ?
                            <Alert bsStyle="success">You are now logged-out</Alert>
                            : null}
                        <FormGroup>
                            <ControlLabel>Enter JudgeNo</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter your JudgeNo"
                                onChange={(e)=>
                                       {this.updateField('j_username',e.target.value)}
                                     }
                                />
                            <FormControl.Feedback/>
                            <HelpBlock></HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Enter Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e)=>
                                       {this.updateField('j_password',e.target.value)}
                                     }
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
        authActions:bindActionCreators(authactions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogIn);