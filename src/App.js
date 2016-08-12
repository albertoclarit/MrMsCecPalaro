import React from 'react';
//import ReactDOM from 'react-dom';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup} from 'react-bootstrap';
import './styles/bootstrap.css';

export default class App extends React.Component {
    //eslint-disable-next-line
   constructor(props){
       super(props);
   }
    goToHome(){
        this.props.history.push("/home");
    }
   
  render(){
      
        const wellStyle={
          width: 400,
          height: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 50
        };
    return (
        <div className="container">
        <Well style={wellStyle}>
          <legend>Welcome to GeminiTech</legend>
          <form>
              <FormGroup>
                    <ControlLabel> Enter Username </ControlLabel>
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
                        <Button  bsStyle="default" type="submit" onClick={this.goToHome.bind(this)}>
                        Login</Button>
                        <Button  bsStyle="primary" type="button">
                        Register</Button>
                    </ButtonGroup>    
                </div>
            </form>
         </Well>
         </div>
    );
  }
}

