/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well,Nav,NavItem} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from './actions/dialogactions';
import AlertModal from './dialogs/alertmodal/AlertModal';
import ConfirmDialog from './dialogs/confirmdialog/ConfirmDialog';
import PromptDialog from './dialogs/promptdialog/PromptDialog';
import { routerActions } from 'react-router-redux'
class Admin extends React.Component {

    constructor(props){
        super(props);
    }


    state = {
        selectedKey:0
    };
    




    handleSelect= (selectedKey)=>{

          switch (selectedKey) {
              case 1:
                  this.props.routerActions.push("/")
                  break;
              case 2:
                  this.props.routerActions.push("/talent")
                  break;
              case 3:
                  this.props.routerActions.push("/gown")
                  break;
              case 4:
                  this.props.routerActions.push("/sportswear")
                  break;   
              case 5:
                  this.props.routerActions.push("/witandint")
                  break;
              case 6:
                  this.props.routerActions.push("/scoreboard")
                  break;
              case 8:
                  this.props.routerActions.push("/judgeslist")
                  break;
              case 9:
                  this.props.routerActions.push("/candidateslist")
                  break;    
              default:
                  return;

          }


      };
    
    render(){
        
        
        return (

            <Well>
                <div className="container">
                    <Nav bsStyle="pills" activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
                        <NavItem eventKey={1}>Home</NavItem>
                        <NavItem eventKey={2}>Best in Talent</NavItem>
                        <NavItem eventKey={3}>Best in Gown</NavItem>
                        <NavItem eventKey={4}>Best is Sportswear</NavItem>
                        <NavItem eventKey={5}>Wit and Intelligent</NavItem>
                        <NavItem eventKey={6}>Score Board</NavItem>
                        <NavItem eventKey={7}>Log out</NavItem>
                        <NavItem eventKey={8}>Judges List</NavItem>
                        <NavItem eventKey={9}>Candidate List </NavItem>
                    </Nav>
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
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Admin);
