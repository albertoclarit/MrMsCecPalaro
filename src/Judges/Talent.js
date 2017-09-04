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

import ScoreCombo from './ScoreCombo'

import * as femaleScoringActions from '../actions/femalescoringactions.js'


class Talent extends React.Component {

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
      this.props.previousCandidate();
        // this.props.femaleScoringActions.nextCandidate(this.props.femalescoring.activeCandidate + 1);
    };

    onScore=(name)=>{

        return (e)=>{
          this.props.onScore(name,parseFloat(e.target.value),this.props.auth.account.event);
            // this.props.femaleScoringActions.updateAndSave(name,parseFloat(e.target.value));
        }
    };

    render(){

        const titleStyle={
            fontSize: 45,
            textAlign:'center'
        };

        const fontSize2={
            fontWeight: 'bold',
            fontSize: 18
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

         if( this.props.femalescoring.candidates.length==0)
           return null;

        var talent = "";
        if(this.props.femalescoring.currentScore.talent)
            talent = this.props.femalescoring.currentScore.talent.toFixed(1);

        return (
          <Well>
            <form>
                <FormGroup >
                    <ControlLabel style={fontSize2}>Talent</ControlLabel>
                    <ScoreCombo onChange ={this.onScore('talent')}
                        value = {talent}/>
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


export default connect(mapStateToProps,mapDispatchToProps)(Talent);
