/**
 * Created by albertoclarit on 8/15/16.
 */
import React from 'react';
import {
    Well,
    Table,
    Button
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from '../../actions/dialogactions';
import * as candidatelistingactions  from '../../actions/candidatelistingactions';
import { routerActions } from 'react-router-redux'

import CandidateForm from './CandidateForm'
class CandidateEditor extends React.Component {

    constructor(props) {
        super(props);

    }

    back = ()=>{
        this.props.routerActions.push("/admin/candidateslist")

    };

    componentDidMount=()=>{

        if(this.props.params.id)
          this.props.candidatelistingactions.loadCandidate(this.props.params.id);

    };

    render(){

        return (
            <Well>
                <h4>{this.props.params.id ? 'Edit':'Add'} a Candidate </h4>

                <CandidateForm selectedCandidate={this.props.selectedCandidate}
                           candidatelistingactions={this.props.candidatelistingactions}
                           dialogActions={this.props.dialogActions}/>
                <Button bsStyle="primary" bsSize="small" onClick={this.back}>Back to List</Button>
            </Well>
        );
    }

}

function mapStateToProps(state) {

    return {
     selectedCandidate:state.candidatelisting.selectedCandidate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
        candidatelistingactions: bindActionCreators(candidatelistingactions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CandidateEditor);
