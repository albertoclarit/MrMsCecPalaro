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
import Alert from 'antd/lib/alert'

import ScoreCombo from './ScoreCombo'
import pic1 from '../../images/Female/1.jpg'
import pic2 from '../../images/Female/2.jpg'
import pic3 from '../../images/Female/3.jpg'
import pic4 from '../../images/Female/4.jpg'
import pic5 from '../../images/Female/5.jpg'
import pic6 from '../../images/Female/6.jpg'
import pic7 from '../../images/Female/7.jpg'
import pic8 from '../../images/Female/8.jpg'
import pic9 from '../../images/Female/9.jpg'
import pic10 from '../../images/Female/10.jpg'
import pic11 from '../../images/Female/11.jpg'
import pic12 from '../../images/Female/12.jpg'
import pic13 from '../../images/Female/13.jpg'
import pic14 from '../../images/Female/14.jpg'
import pic15 from '../../images/Female/15.jpg'
import pic16 from '../../images/Female/16.jpg'
import pic17 from '../../images/Female/17.jpg'
import pic18 from '../../images/Female/18.jpg'

import * as femaleScoringActions from '../actions/femalescoringactions.js'
import * as finalroundActions from '../actions/finalroundactions'
import * as finalroundscoringActions from '../actions/finalroundscoringactions'

import Talent from './Talent';
import Coronation from './Coronation';
import FinalCombo from './FinalCombo';


class FinalRoundScore extends React.Component {

    constructor(props){
        super(props);



    }

    state = {
        pic_reference:[]
    };

      static contextTypes = {
        router: React.PropTypes.object
    };

    componentWillMount(){

      this.props.finalroundActions.checkStatus()

        var pics = [];
        pics.push(pic1);
        pics.push(pic2);
        pics.push(pic3);
        pics.push(pic4);
        pics.push(pic5);
        pics.push(pic6);
        pics.push(pic7);
        pics.push(pic8);
        pics.push(pic9);
        pics.push(pic10);
        pics.push(pic11);
        pics.push(pic12);
        pics.push(pic13);
        pics.push(pic14);
        pics.push(pic15);
        pics.push(pic16);
        pics.push(pic17);
        pics.push(pic18);



        this.setState({
            pic_reference:pics
        })

    }


    previousCandidate=()=>{

        this.props.finalroundscoringActions.previousCandidate(this.props.finalroundscoring.activeCandidate-1);

    };

    nextCandidate=()=>{
        this.props.finalroundscoringActions.nextCandidate(this.props.finalroundscoring.activeCandidate + 1,this.props.auth.account.event);
    };


     componentDidMount(){
         this.props.finalroundscoringActions.loadFinalroundCandidates(this.props.auth.account.judgeNo,this.props.auth.account.event);
     }

    onScore=(name,value,event)=>{
            this.props.finalroundscoringActions.updateAndSave(name,value,event);
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
        if(this.props.finalround.isStarted === false)
          return (
            <Alert
              message="Error"
              description="Final Round has not started yet."
              type="error"
              showIcon
            />
          )

         if( this.props.finalroundscoring.candidates.length==0)
           return null;
         

        var production = "";
          if(this.props.finalroundscoring.currentScore.production)
              production = this.props.finalroundscoring.currentScore.production.toFixed(1);

        var talent = "";
        if(this.props.finalroundscoring.currentScore.talent)
            talent = this.props.finalroundscoring.currentScore.talent.toFixed(1);

        var formalWear = "";
        if(this.props.finalroundscoring.currentScore.formalWear)
            formalWear = this.props.finalroundscoring.currentScore.formalWear.toFixed(1);

        var sportswear = "";
        if(this.props.finalroundscoring.currentScore.sportswear)
            sportswear = this.props.finalroundscoring.currentScore.sportswear.toFixed(1);

        var qa = "";
        if(this.props.finalroundscoring.currentScore.qa)
            qa = this.props.finalroundscoring.currentScore.qa.toFixed(1);


          return(
            <div>
              <Grid>
                <h2 style={{ textAlign: 'center' }} > Final Round Scoring </h2>
                <br />
                <Col md={6}   >
                  <div style={imageStyle}>
                    <Image src={this.state.pic_reference[this.props.finalroundscoring.activeCandidate]} circle  width="300" height="400"/>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.finalroundscoring.candidates[this.props.finalroundscoring.activeCandidate].candidateNo}</h4>
                      <h5>Candidate #</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.finalroundscoring.candidates[this.props.finalroundscoring.activeCandidate].name}</h4>
                      <h5>Name</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.finalroundscoring.candidates[this.props.finalroundscoring.activeCandidate].address + ", Loboc"}</h4>
                      <h5>Barangay</h5>
                    </div>
                  </div>
                </Col>
                <Col md={6}   >
                  <br />
                  <FinalCombo
                    gender="female"
                    previousCandidate={this.previousCandidate}
                    nextCandidate={this.nextCandidate}
                    onScore={this.onScore}
                    goToMale={this.goToMale}
                    score={this.props.finalroundscoring}
                  />
                  <div style={buttonStyle}>
                      {this.props.finalroundscoring.activeCandidate > 0 ?
                      (<Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                          PREVIOUS </Button>)
                          :
                          <Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                          PREVIOUS </Button>}

                      {this.props.finalroundscoring.activeCandidate < this.props.finalroundscoring.candidates.length  -1 ?
                          ( <Button bsSize="small" onClick={this.nextCandidate} bsStyle="primary" type="button" block>
                              NEXT </Button>)
                          :
                           <Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                           NEXT </Button>
                      }
                  </div>
                </Col>
            </Grid>
            </div>
          )

    }
}


function mapStateToProps(state) {
    return {
        finalroundscoring: state.finalroundscoring,
        auth: state.auth,
        finalround: state.finalround
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        finalroundscoringActions: bindActionCreators(finalroundscoringActions,dispatch),
        finalroundActions: bindActionCreators(finalroundActions,dispatch),
        femaleScoringActions: bindActionCreators(femaleScoringActions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(FinalRoundScore);
