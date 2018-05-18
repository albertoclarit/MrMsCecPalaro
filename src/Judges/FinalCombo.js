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
        ButtonGroup,
        Image,
       Grid,
       Col,
       Row} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux'
import Icon from 'antd/lib/icon'

import ScoreCombo from './ScoreCombo'

import * as femaleScoringActions from '../actions/femalescoringactions.js'

class Coronation extends React.Component {

    constructor(props){
        super(props);



    }

      static contextTypes = {
        router: React.PropTypes.object
    };

    previousCandidate=()=>{

        this.props.previousCandidate();
        // this.props.femaleScoringActions.previousCandidate(this.props.femalescoring.activeCandidate-1);

    };

    nextCandidate=()=>{
        this.props.nextCandidate();
        // this.props.femaleScoringActions.nextCandidate(this.props.femalescoring.activeCandidate + 1);
    };

    onScore=(name)=>{
      return (e)=>{
        this.props.onScore(name,parseFloat(e.target.value),this.props.auth.account.event);
        //     this.props.femaleScoringActions.updateAndSave(name,parseFloat(e.target.value));
        }
    };

    render(){

        const titleStyle={
            fontSize: 45,
            textAlign:'center'
        };

        const fontSize2={
            fontWeight: 'bold',
            fontSize: 17
        };

        const buttonStyle={
            maxWidth: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        };

        const imageStyle={
            textAlign: 'center'
        }

        const boxMargin1={
            marginLeft: 20
        };

        const nameStyle={
            padding: 0,
            marginTop: 40,
            marginBottom: -20
        };
        const textUnderline={
            textDecoration: 'underline'
        };


        var interview = "";
          if(this.props.score.currentScore.interview)
              interview = this.props.score.currentScore.interview.toFixed(1);

        var poise = "";
        if(this.props.score.currentScore.poise)
            poise = this.props.score.currentScore.poise.toFixed(1);


        return (
                <Well>
                    <form>
                        <FormGroup >
                            <ControlLabel style={fontSize2}>Production <Icon type="check-circle-o" style={{ color: '#2ecc71', marginLeft: 5 }} /> </ControlLabel>
                            <ScoreCombo onChange ={this.onScore('interview')}
                                value = {interview}/>
                        </FormGroup>
                        <FormGroup >
                            <ControlLabel style={fontSize2}>Swimsuit</ControlLabel>
                            <ScoreCombo onChange ={this.onScore('poise')}
                                        value = {poise}/>
                        </FormGroup>
                    </form>
               </Well>
        );
    }
}


function mapStateToProps(state) {
    return {
        femalescoring: state.femalescoring,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        femaleScoringActions: bindActionCreators(femaleScoringActions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Coronation);
