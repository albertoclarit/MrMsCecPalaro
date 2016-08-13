/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well, 
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup} from 'react-bootstrap';


export default class Judges extends React.Component {

    constructor(props){
        super(props);
        
    }


    render(){
        
        const fontSize={
            fontSize: 50
        }
        
        const wellStyle={
            width: 400,
            height: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 80
        }
        
        return (
            <Well style={wellStyle}>
                  <center style={fontSize}>Judges Page </center>
                  <div className="container">
                  <legend>Welcome to Gemini Tech</legend>
                  <form>
                    <FormGroup>
                        <ControlLabel>Enter Username </ControlLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Your Username'/>
                            <FormControl.Feedback/>
                            <HelpBlock> </HelpBlock>
                    </FormGroup>
                    <FormGroup>
                         <ControlLabel>Enter Password </ControlLabel>
                             <FormControl
                                type='password'
                                placeholder='Enter Your Password'/>
                             <FormControl.Feedback/>
                             <HelpBlock> </HelpBlock>
                    </FormGroup>
                        <div className="button">
                            <ButtonGroup>
                                <Button  bsStyle="default" type="submit" onClick={this.goToRegister.bind(this)}>
                                Login</Button>
                                <Button  bsStyle="primary" type="button" onClick={this.goToRegister.bind(this)}>
                                Register</Button>
                            </ButtonGroup>    
                        </div>
                    </form>
                </div>
            </Well>

        );
    }
}

