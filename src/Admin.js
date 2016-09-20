/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well,Nav,NavItem,Navbar} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from './actions/dialogactions';
import AlertModal from './dialogs/alertmodal/AlertModal';
import ConfirmDialog from './dialogs/confirmdialog/ConfirmDialog';
import PromptDialog from './dialogs/promptdialog/PromptDialog';
import { routerActions } from 'react-router-redux'
import * as HealthChecksAction from './actions/healthchecks';
import * as authactions  from './actions/authactions';
class Admin extends React.Component {

    constructor(props){
        super(props);
    }


    state = {
        selectedKey:0
    };



    componentDidMount(){
        this.props.actions.ping();
    }



    handleSelect= (selectedKey)=>{

          switch (selectedKey) {
              case 1:
                  this.props.routerActions.push("/admin/talent");
                  break;
              case 2:
                  this.props.routerActions.push("/admin/production");
                  break;
              case 3:
                  this.props.routerActions.push("/admin/gown");
                  break;
              case 4:
                  this.props.routerActions.push("/admin/sportswear");
                  break;   
              case 5:
                  this.props.routerActions.push("/admin/witandint");
                  break;
              case 6:
                  this.props.routerActions.push("/admin/judgeslist");
                  break;
              case 7:
                  this.props.routerActions.push("/admin/candidateslist");
                  break;
              case 8:
                  this.props.routerActions.push("/admin/scoreboard");
                  break;
              case 9:
                   this.props.authActions.logout();
                  break;
                  break;
              case 10:

                  break;
              default:
                  return;

          }


      };
    
    render(){
        
        
        return (

            <Well>
                <div className="container">
                     <Navbar inverse>
                        <Navbar.Header>
                        <Navbar.Brand>
                            <a>Mr and  Ms Ce-c </a>

                        </Navbar.Brand>
                        <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <Nav  activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
                            <NavItem eventKey={2}>Best in Production</NavItem>
                            <NavItem eventKey={1}>Best in Talent</NavItem>
                            <NavItem eventKey={3}>Best in Formal Wear</NavItem>
                            <NavItem eventKey={4}>Best is Sportswear</NavItem>
                            <NavItem eventKey={5}>Wit and Intelligent</NavItem>
                            <NavItem eventKey={8}>Final Ranking</NavItem>
                            <NavItem eventKey={6}>Judges List</NavItem>
                            <NavItem eventKey={7}>Candidate List </NavItem>
                            <NavItem eventKey={9}>Log out</NavItem>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.props.children}
                    <AlertModal {...this.props.alert} dialogActions={this.props.dialogActions}/>
                    <ConfirmDialog {...this.props.confirm} dialogActions={this.props.dialogActions}/>
                    <PromptDialog {...this.props.prompt} dialogActions={this.props.dialogActions}/>
                </div>
            </Well>

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
        dialogActions: bindActionCreators(dialogActions, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
        authActions: bindActionCreators(authactions, dispatch),
        actions: bindActionCreators(HealthChecksAction, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Admin);
