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
import pic1 from '../../images/Female/1.jpg'
import pic2 from '../../images/Female/2.jpg'
import pic3 from '../../images/Female/3.jpg'
import pic4 from '../../images/Female/4.jpg'
import pic5 from '../../images/Female/5.jpg'

import * as femaleScoringActions from '../actions/femalescoringactions.js'

import Icon from 'antd/lib/icon'


class PrePageant extends React.Component {

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

        var production = "";
          if(this.props.femalescoring.currentScore.production)
            production = this.props.femalescoring.currentScore.production.toFixed(1);

        return (
          <Well>
            <form>
                <FormGroup >
                    <ControlLabel style={fontSize2}>
                    Production
                    {
                      this.props.score.control.judge.production === "CONFIRMED" ? 
                        <Icon type="check-circle-o" style={{ color: '#2ecc71', marginLeft: 5 }} />
                      :
                        <Icon type="close-circle-o" style={{ color: '#e74c3c', marginLeft: 5 }} />
                    }
                    </ControlLabel>
                    <ScoreCombo onChange ={this.onScore('production')}
                      disabled={this.props.score.control.admin.talent === "ACTIVE" ? false : true }
                        addTo={1}
                        value={production}/>
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


export default connect(mapStateToProps,mapDispatchToProps)(PrePageant);
