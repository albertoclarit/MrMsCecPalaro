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


        var production = "";
          if(this.props.score.currentScore.production)
              production = this.props.score.currentScore.production.toFixed(1);

        var talent = "";
        if(this.props.score.currentScore.talent)
            talent = this.props.score.currentScore.talent.toFixed(1);

        var formalWear = "";
        if(this.props.score.currentScore.formalWear)
            formalWear = this.props.score.currentScore.formalWear.toFixed(1);

        var swimsuit = "";
        if(this.props.score.currentScore.swimsuit)
            swimsuit = this.props.score.currentScore.swimsuit.toFixed(1);


        var qa = "";
        if(this.props.score.currentScore.qa)
            qa = this.props.score.currentScore.qa.toFixed(1);


        return (
                <Well>
                    <form>
                        <FormGroup >
                            <ControlLabel 
                              style={fontSize2}
                              >Swimsuit 
                              {
                                this.props.score.control.judge.swimsuit === "CONFIRMED" ? 
                                  <Icon type="check-circle-o" style={{ color: '#2ecc71', marginLeft: 5 }} />
                                :
                                  <Icon type="close-circle-o" style={{ color: '#e74c3c', marginLeft: 5 }} />
                              }
                              </ControlLabel>
                            <ScoreCombo 
                              disabled = {this.props.score.control.admin.swimsuit === "ACTIVE" ? false : true}
                              onChange ={this.onScore('swimsuit')}
                              addTo={1}
                              value = {swimsuit}
                            />
                        </FormGroup>
                        <FormGroup >
                            <ControlLabel 
                              style={fontSize2}
                              >Evening Gown 
                              {
                                this.props.score.control.judge.gown === "CONFIRMED" ? 
                                  <Icon type="check-circle-o" style={{ color: '#2ecc71', marginLeft: 5 }} />
                                :
                                  <Icon type="close-circle-o" style={{ color: '#e74c3c', marginLeft: 5 }} />
                              }
                              </ControlLabel>
                            <ScoreCombo 
                              disabled = {this.props.score.control.admin.gown === "ACTIVE" ? false : true}
                              onChange ={this.onScore('formalWear')}
                              addTo={1}
                              value = {formalWear}
                            />
                        </FormGroup>
                        <FormGroup >
                            <ControlLabel 
                              style={fontSize2}
                              >Interview
                              {
                                this.props.score.control.judge.interview === "CONFIRMED" ? 
                                  <Icon type="check-circle-o" style={{ color: '#2ecc71', marginLeft: 5 }} />
                                :
                                  <Icon type="close-circle-o" style={{ color: '#e74c3c', marginLeft: 5 }} />
                              }
                              </ControlLabel>
                            <ScoreCombo 
                              disabled = {this.props.score.control.admin.interview === "ACTIVE" ? false : true}
                              onChange ={this.onScore('qa')}
                              addTo={1}
                              value = {qa}
                            />
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
