import React from 'react';
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
import { routerActions } from 'react-router-redux'
import * as HealthChecksAction from './actions/healthchecks';
import * as authactions  from './actions/authactions';

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



    componentDidMount(){
        this.props.actions.ping();
    }


    handleSelect= (selectedKey)=>{
          this.setState({selectedKey});
          switch (selectedKey) {
              case 1:
                  this.props.authActions.logout();
                  break;
              case 2:
                  this.props.routerActions.push('/judge');
                  break;
              case 3:
                  this.props.routerActions.push('/overall');
                  break;
              case 4:
                this.props.routerActions.push('/finalround');
                break;
              case 5:
                this.props.routerActions.push('/finaloverall');
                break;
              case 6:
                this.props.routerActions.push('/controls');
                break;
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
        
const marginPull={
            marginRight: 50
}

    return (
        <div >
            <Well >
              <Navbar inverse>
                            <Navbar.Header>
                            <Navbar.Brand>
                                <a>Miss Loboc 2018</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                                
                            </Navbar.Header>
                            <Navbar.Collapse>
                              {this.props.auth.isAuthenticated ?
                                <Nav  activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
                                  <NavItem eventKey={2}>Preliminary</NavItem>
                                  <NavItem eventKey={3}>Overall</NavItem>
                                  {
                                    this.props.auth.account.event ==="Coronation" ?
                                    <Nav >
                                      <NavItem eventKey={4}>Final Round</NavItem>
                                      <NavItem eventKey={5}>Final Round Overall</NavItem>
                                    </Nav>
                                    :
                                    null
                                  }
                                  <NavItem eventKey={6}>Confirm</NavItem>
                                </Nav>
                                :
                                null
                              }
                                {this.props.auth.isAuthenticated ?
                                    <Nav pullRight onSelect={this.handleSelect} style={marginPull}>
                                        <NavItem eventKey={1}>Logout</NavItem>
                                    </Nav>:
                                     null
                                }

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
        prompt:state.dialogs.prompt,
        auth:state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        authActions: bindActionCreators(authactions, dispatch),
        actions: bindActionCreators(HealthChecksAction, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);


