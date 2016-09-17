import React from 'react';
//import ReactDOM from 'react-dom';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup,
        Nav,
        NavItem,
        Navbar
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from './actions/dialogactions';
import AlertModal from './dialogs/alertmodal/AlertModal';
import ConfirmDialog from './dialogs/confirmdialog/ConfirmDialog';
import PromptDialog from './dialogs/promptdialog/PromptDialog';


class App extends React.Component {
    //eslint-disable-next-line
   constructor(props){
       super(props);
   }


state={
    selectedKey:1
};
    static contextTypes = {
        router: React.PropTypes.object
    };



    handleSelect= (selectedKey)=>{
          this.setState({selectedKey});
          switch (selectedKey) {
              case 1:
                  this.context.router.push("/");
                  break;
              case 2:
                  this.context.router.push("/logIn")
                  break;
              case 3:
<<<<<<< HEAD
                  this.context.router.push("/female")
                  break;   
=======
                  this.context.router.push("/judges")
                  break;  
              case 4:
                  this.context.router.push("/error")
                  break;    
>>>>>>> 85fe011b9e4231a31798dffcc257cfc7485f8dd1
              default:
                  return;

          }


      };


  render(){
      
const wellStyle={
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
        }

    return (
        <div className="container">
            <Well style={wellStyle}>
                <Navbar inverse>
                            <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">Mr & Ms Ce-c Palaro</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                            <Nav  activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
                                <NavItem eventKey={1}>Home</NavItem>
                                <NavItem eventKey={2}>Log-In</NavItem>
                                <NavItem eventKey={3}>Judges</NavItem>
                                <NavItem eventKey={4}>Error</NavItem>
                            </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                {this.props.children}
                <AlertModal {...this.props.alert} dialogActions={this.props.dialogActions}/>
                <ConfirmDialog {...this.props.confirm} dialogActions={this.props.dialogActions}/>
                <PromptDialog {...this.props.prompt} dialogActions={this.props.dialogActions}/>
            </Well>       
         </div>
    );
  }
}


function mapStateToProps(state) {

    return {
        alert:state.dialogs.alert,
        confirm:state.dialogs.confirm,
        prompt:state.dialogs.prompt
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);


