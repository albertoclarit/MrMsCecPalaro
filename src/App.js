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
        NavItem
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
                  this.context.router.push("/admin")
                  break;   
              default:
                  return;

          }


      };


  render(){
      

    return (
        <div className="container">
            <Nav bsStyle="pills" activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
                <NavItem eventKey={1}>Home</NavItem>
                <NavItem eventKey={2}>Log-In</NavItem>
            </Nav>
            {this.props.children}
            <AlertModal {...this.props.alert} dialogActions={this.props.dialogActions}/>
            <ConfirmDialog {...this.props.confirm} dialogActions={this.props.dialogActions}/>
            <PromptDialog {...this.props.prompt} dialogActions={this.props.dialogActions}/>
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


