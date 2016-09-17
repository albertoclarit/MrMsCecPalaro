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
<<<<<<< HEAD
=======


    componentDidMount(){
        this.props.actions.ping();
    }


>>>>>>> 98d3559220b1b8cdf40e80ee6ccfc1b5ff2c46d1

    handleSelect= (selectedKey)=>{

          switch (selectedKey) {

              case 2:
                  this.props.routerActions.push("/talent")
                  break;
              case 3:
                  this.props.routerActions.push("/production")
                  break;
              case 4:
                  this.props.routerActions.push("/sportswear")
                  break;   
              case 5:
                  this.props.routerActions.push("/Formalwear")
                  break;
              case 6:
                  this.props.routerActions.push("/scoreboard")
                  break;
              case 8:
                  this.props.routerActions.push("/judgeslist")
                  break;
              case 9:
                  this.props.routerActions.push("/candidateslist")
<<<<<<< HEAD
                  break;    
=======
                  break;
              case 7:
                   this.props.authActions.logout();
                  break;
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
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
<<<<<<< HEAD
                            <a href="#">Mr & Ms Ce-c Palaro</a>
=======
                            <a href="#">Mr and  Ms Ce-c Palaro</a>
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <Nav  activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
<<<<<<< HEAD
                            <NavItem eventKey={1}>Home</NavItem>
                            <NavItem eventKey={2}>Best in Talent</NavItem>
                            <NavItem eventKey={3}>Best in Gown</NavItem>
                            <NavItem eventKey={4}>Best is Sportswear</NavItem>
                            <NavItem eventKey={5}>Wit and Intelligent</NavItem>
                            <NavItem eventKey={6}>Score Board</NavItem>
                            <NavItem eventKey={7}>Log out</NavItem>
                            <NavItem eventKey={8}>Judges List</NavItem>
                            <NavItem eventKey={9}>Candidate List </NavItem>
=======

                            <NavItem eventKey={2}>Best in Talent</NavItem>
                            <NavItem eventKey={3}>Best in Production</NavItem>
                            <NavItem eventKey={4}>Best is Sportswear</NavItem>
<<<<<<< HEAD
                            <NavItem eventKey={5}>Formal wear</NavItem>
                            <NavItem eventKey={6}>Final Ranking</NavItem>
                            <NavItem eventKey={7}>Log out</NavItem>
=======
                            <NavItem eventKey={5}>Wit and Intelligent</NavItem>
                            <NavItem eventKey={6}>Score Board</NavItem>
>>>>>>> 98d3559220b1b8cdf40e80ee6ccfc1b5ff2c46d1
                            <NavItem eventKey={8}>Judges List</NavItem>
                            <NavItem eventKey={9}>Candidate List </NavItem>
                            <NavItem eventKey={7}>Log out</NavItem>
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
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
