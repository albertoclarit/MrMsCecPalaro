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
import * as judgelistingactions  from '../../actions/judgelistingactions';
import { routerActions } from 'react-router-redux'

import JudgeForm from './JudgeForm'
class JudgeEditor extends React.Component {

    constructor(props) {
        super(props);

    }

    back = ()=>{
        this.props.routerActions.push("/judgeslist")

    };

    componentDidMount=()=>{

        if(this.props.params.id)
          this.props.judgelistingactions.loadJudge(this.props.params.id);

    };

    render(){

        return (
            <Well>
                <h4>{this.props.params.id ? 'Edit':'Add'} a Judge </h4>

                <JudgeForm selectedJudge={this.props.selectedJudge}
                           judgelistingactions={this.props.judgelistingactions}
                           dialogActions={this.props.dialogActions}/>
                <Button bsStyle="primary" onClick={this.back}>Back to List</Button>
            </Well>
        );
    }

}

function mapStateToProps(state) {

    return {
     selectedJudge:state.judgelisting.selectedJudge
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
        judgelistingactions: bindActionCreators(judgelistingactions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(JudgeEditor);
