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
import * as controlActions from '../actions/controlactions'

import Talent from './Talent';
import Coronation from './Coronation';
import PrePageant from './PrePageant';


class Female extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        pic_reference:[],
    };

      static contextTypes = {
        router: React.PropTypes.object
    };


    goToMale=()=>{
        this.props.routerActions.push("/male")

    }

    componentWillMount(){

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
        this.props.femaleScoringActions.getConfirms()
    }

    componentWillUnmount(){

        if( this.interval)
            clearInterval( this.interval);
    }


    previousCandidate=()=>{

        this.props.femaleScoringActions.previousCandidate(this.props.femalescoring.activeCandidate-1);

    };

    nextCandidate=()=>{
        this.props.femaleScoringActions.nextCandidate(this.props.femalescoring.activeCandidate + 1,this.props.auth.account.event);
    };


     componentDidMount(){
        this.props.femaleScoringActions.loadFemaleCandidates(this.props.auth.account.judgeNo,this.props.auth.account.event);
        this.interval = setInterval(()=>{
          this.props.femaleScoringActions.getConfirms();
        },2500); // every 1.5 seconds refresh
      }

    onScore=(name,value,event)=>{
            this.props.femaleScoringActions.updateAndSave(name,value,event);
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

        if(!this.props.femalescoring.control.admin)
        return null;

        var production = "";
          if(this.props.femalescoring.currentScore.production)
              production = this.props.femalescoring.currentScore.production.toFixed(1);

        var talent = "";
        if(this.props.femalescoring.currentScore.talent)
            talent = this.props.femalescoring.currentScore.talent.toFixed(1);

        var formalWear = "";
        if(this.props.femalescoring.currentScore.formalWear)
            formalWear = this.props.femalescoring.currentScore.formalWear.toFixed(1);

        var sportswear = "";
        if(this.props.femalescoring.currentScore.sportswear)
            sportswear = this.props.femalescoring.currentScore.sportswear.toFixed(1);

        var qa = "";
        if(this.props.femalescoring.currentScore.qa)
            qa = this.props.femalescoring.currentScore.qa.toFixed(1);


        if(this.props.auth.account.event === "Coronation"){
          return(
            <div>
              <Grid>
                <h2 style={{ textAlign: 'center' }} > Preliminary Scoring </h2>
                <Col md={6}   >
                  <div style={imageStyle}>
                    <Image src={this.state.pic_reference[this.props.femalescoring.activeCandidate]} circle  width="300" height="400"/>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].candidateNo}</h4>
                      <h5>Candidate #</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].name}</h4>
                      <h5>Name</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].address + ", Loboc"}</h4>
                      <h5>Barangay</h5>
                    </div>
                  </div>
                </Col>
                <Col md={6}   >
                  <br />
                  <Coronation
                    gender="female"
                    previousCandidate={this.previousCandidate}
                    nextCandidate={this.nextCandidate}
                    onScore={this.onScore}
                    goToMale={this.goToMale}
                    score={this.props.femalescoring}
                    />
                  <div style={buttonStyle}>
                      {this.props.femalescoring.activeCandidate > 0 ?
                      (<Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                          PREVIOUS </Button>)
                          :
                          <Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                          PREVIOUS </Button>}

                      {this.props.femalescoring.activeCandidate < this.props.femalescoring.candidates.length  -1 ?
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
        }else if(this.props.auth.account.event === "Talent"){
          return(
            <div>
              <Grid>
                <h3 style={titleStyle}>Female Scoring </h3>
                <Col md={6} mdPull={1}  >
                  <div style={imageStyle}>
                    <Image src={this.state.pic_reference[this.props.femalescoring.activeCandidate]} circle  width="300" height="400"/>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].candidateNo}</h4>
                      <h5>Candidate #</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].name}</h4>
                      <h5>Name</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].address + ", Loboc"}</h4>
                      <h5>Barangay</h5>
                    </div>
                  </div>
                </Col>
                <Col md={6}  mdPull={1} >
                  <br />
                  <Talent
                    gender="female"
                    previousCandidate={this.previousCandidate}
                    nextCandidate={this.nextCandidate}
                    onScore={this.onScore}
                    goToMale={this.goToMale}
                    score={this.props.femalescoring}
                    />
                  <div style={buttonStyle}>
                      {this.props.femalescoring.activeCandidate > 0 ?
                      (<Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                          PREVIOUS </Button>)
                          :
                          <Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                          PREVIOUS </Button>}

                      {this.props.femalescoring.activeCandidate < this.props.femalescoring.candidates.length  -1 ?
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
        }else if(this.props.auth.account.event === "Production"){
          return(
            <div>
              <Grid>
                <h3 style={titleStyle}>Female Scoring </h3>
                <Col md={6} mdPull={1}  >
                  <div style={imageStyle}>
                    <Image src={this.state.pic_reference[this.props.femalescoring.activeCandidate]} circle  width="300" height="400"/>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].candidateNo}</h4>
                      <h5>Candidate #</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].name}</h4>
                      <h5>Name</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].address + ", Loboc"}</h4>
                      <h5>Barangay</h5>
                    </div>
                  </div>
                </Col>
                <Col md={6}  mdPull={1} >
                  <br />
                  <PrePageant
                    gender="female"
                    previousCandidate={this.previousCandidate}
                    nextCandidate={this.nextCandidate}
                    onScore={this.onScore}
                    goToMale={this.goToMale}
                    score={this.props.femalescoring}
                    />
                  <div style={buttonStyle}>
                      {this.props.femalescoring.activeCandidate > 0 ?
                      (<Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                          PREVIOUS </Button>)
                          :
                          <Button bsSize="small" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                          PREVIOUS </Button>}

                      {this.props.femalescoring.activeCandidate < this.props.femalescoring.candidates.length  -1 ?
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


        // return (
        //
        //
        //
        //         <Well>
        //             <div>
        //                 <ButtonGroup>
        //                     <Button  bsStyle="primary">Female </Button>
        //                     <Button style= {boxMargin1} bsStyle="primary" onClick={this.goToMale.bind(this)} type="button"> Male</Button>
        //                 </ButtonGroup>
        //             </div>
        //
        //           <h3 style={titleStyle}>Female Scoring </h3>
        //
        //             <Grid>
        //
        //                         <Col md={6} mdPull={1}  >
        //                             <div style={imageStyle}>
        //                                 <Image src={this.state.pic_reference[this.props.femalescoring.activeCandidate]} circle  width="300" height="400"/>
        //                                 <div style={nameStyle}>
        //                                     <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].candidateNo}</h4>
        //                                     <h5>Candidate #</h5>
        //                                 </div>
        //                                 <div style={nameStyle}>
        //                                     <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].name}</h4>
        //                                     <h5>Name</h5>
        //                                 </div>
        //                                 <div style={nameStyle}>
        //                                     <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].team}</h4>
        //                                     <h5>House</h5>
        //                                 </div>
        //                             </div>
        //                         </Col>
        //                         <Col md={6}  mdPull={1} >
        //                             <form>
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}>Production Number</ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('production')}
        //                                         value = {production}/>
        //                                 </FormGroup>
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Talent Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('talent')}
        //                                                 value = {talent}/>
        //                                 </FormGroup>
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Sportswear Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('sportswear')}
        //                                                 value = {sportswear}/>
        //                                 </FormGroup>
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Gown Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('formalWear')}
        //                                                 value = {formalWear}/>
        //                                 </FormGroup>
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Wit &amp; Intelligence Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('qa')}
        //                                                 value = {qa}/>
        //                                 </FormGroup>
        //                                     <div style={buttonStyle}>
        //                                         {this.props.femalescoring.activeCandidate > 0 ?
        //                                         (<Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
        //                                             PREVIOUS </Button>)
        //                                             :
        //                                             <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
        //                                             PREVIOUS </Button>}
        //
        //                                         {this.props.femalescoring.activeCandidate < this.props.femalescoring.candidates.length  -1 ?
        //                                             ( <Button bsSize="large" onClick={this.nextCandidate} bsStyle="primary" type="button" block>
        //                                                 NEXT </Button>)
        //                                             :
        //                                              <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
        //                                              NEXT </Button>
        //                                         }
        //                                     </div>
        //                             </form>
        //                         </Col>
        //             </Grid>
        //
        //
        //        </Well>
        // );
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
        femaleScoringActions: bindActionCreators(femaleScoringActions, dispatch),
        controlActions: bindActionCreators(controlActions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Female);
