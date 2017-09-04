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

import pic1 from '../../images/Male/1.jpg'
import pic2 from '../../images/Male/2.jpg'
import pic3 from '../../images/Male/3.jpg'
import pic4 from '../../images/Male/4.jpg'
import pic5 from '../../images/Male/5.jpg'

import * as maleScoringActions from '../actions/malescoringactions.js'
import Coronation from './Coronation';
import Talent from './Talent';
import PrePageant from './PrePageant';

 class Male extends React.Component {

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

        var pics = [];
        pics.push(pic1);
        pics.push(pic2);
        pics.push(pic3);
        pics.push(pic4);
        pics.push(pic5);



        this.setState({
            pic_reference:pics
        })

    }

     goToFemale=()=>{
         this.props.routerActions.push("/female")
     }

    componentDidMount(){
      this.props.maleScoringActions.loadMaleCandidates(this.props.auth.account.judgeNo);
    }

    previousCandidate=()=>{

        this.props.maleScoringActions.previousCandidate(this.props.malescoring.activeCandidate-1);

    };

    nextCandidate=()=>{
        this.props.maleScoringActions.nextCandidate(this.props.malescoring.activeCandidate + 1);
    };


     onScore=(name,value,event)=>{
             this.props.maleScoringActions.updateAndSave(name,value,event);
     };


    render(){

        const titleStyle={
            fontSize: 45,
            textAlign:'center'
        };

        const fontSize2={
            fontWeight: 'bold',
            fontSize: 18
        }

        const buttonStyle={
            maxWidth: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        };

        const boxMargin={
            marginLeft: 80
        };

        const boxMargin1={
            marginLeft: 20
        };

        const nameStyle={
            padding: 0,
            marginTop: 40,
            marginBottom: -20
        };

        const imageStyle={
            textAlign: 'center'
        };

         const textUnderline={
            textDecoration: 'underline'
        };

          if( this.props.malescoring.candidates.length==0)
          return null;


        var production = "";
        if(this.props.malescoring.currentScore.production)
            production = this.props.malescoring.currentScore.production.toFixed(1);

        var talent = "";
        if(this.props.malescoring.currentScore.talent)
            talent = this.props.malescoring.currentScore.talent.toFixed(1);

        var formalWear = "";
        if(this.props.malescoring.currentScore.formalWear)
            formalWear = this.props.malescoring.currentScore.formalWear.toFixed(1);

        var sportswear = "";
        if(this.props.malescoring.currentScore.sportswear)
            sportswear = this.props.malescoring.currentScore.sportswear.toFixed(1);


        var qa = "";
        if(this.props.malescoring.currentScore.qa)
            qa = this.props.malescoring.currentScore.qa.toFixed(1);


        if(this.props.auth.account.event === "Coronation"){
          return(
            <div>
              <div>
                  <ButtonGroup>
                      <Button  bsStyle="primary" onClick={this.goToFemale.bind(this)}>Female </Button>
                      <Button style= {boxMargin1} bsStyle="primary" type="button"> Male</Button>
                  </ButtonGroup>
              </div>
              <Grid>
                <h3 style={titleStyle}>Male Scoring </h3>
                <Col md={6} mdPull={1}  >
                  <div style={imageStyle}>
                    <Image src={this.state.pic_reference[this.props.malescoring.activeCandidate]} circle  width="300" height="400"/>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].candidateNo}</h4>
                      <h5>Candidate #</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].name}</h4>
                      <h5>Name</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].team}</h4>
                      <h5>Team</h5>
                    </div>
                  </div>
                </Col>
                <Col md={6}  mdPull={1} >
                  <br />
                  <Coronation
                    gender="male"
                    previousCandidate={this.previousCandidate}
                    nextCandidate={this.nextCandidate}
                    onScore={this.onScore}
                    score={this.props.malescoring}
                    />
                  <div style={buttonStyle}>
                      {this.props.malescoring.activeCandidate > 0 ?
                      (<Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                          PREVIOUS </Button>)
                          :
                          <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                          PREVIOUS </Button>}

                      {this.props.malescoring.activeCandidate < this.props.malescoring.candidates.length  -1 ?
                          ( <Button bsSize="large" onClick={this.nextCandidate} bsStyle="primary" type="button" block>
                              NEXT </Button>)
                          :
                           <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
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
              <div>
                  <ButtonGroup>
                      <Button  bsStyle="primary" onClick={this.goToFemale.bind(this)}>Female </Button>
                      <Button style= {boxMargin1} bsStyle="primary" type="button"> Male</Button>
                  </ButtonGroup>
              </div>
              <Grid>
                <Col md={6} mdPull={1}  >
                  <h3 style={titleStyle}>Female Scoring </h3>
                  <div style={imageStyle}>
                    <Image src={this.state.pic_reference[this.props.malescoring.activeCandidate]} circle  width="300" height="400"/>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].candidateNo}</h4>
                      <h5>Candidate #</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].name}</h4>
                      <h5>Name</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].team}</h4>
                      <h5>Team</h5>
                    </div>
                  </div>
                </Col>
                <Col md={6}  mdPull={1} >
                  <br />
                  <Talent
                    gender="male"
                    previousCandidate={this.previousCandidate}
                    nextCandidate={this.nextCandidate}
                    onScore={this.onScore}
                    score={this.props.malescoring}
                    />
                  <div style={buttonStyle}>
                      {this.props.malescoring.activeCandidate > 0 ?
                      (<Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                          PREVIOUS </Button>)
                          :
                          <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                          PREVIOUS </Button>}

                      {this.props.malescoring.activeCandidate < this.props.malescoring.candidates.length  -1 ?
                          ( <Button bsSize="large" onClick={this.nextCandidate} bsStyle="primary" type="button" block>
                              NEXT </Button>)
                          :
                           <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                           NEXT </Button>
                      }
                  </div>
                </Col>
            </Grid>
            </div>
          )
        }else if(this.props.auth.account.event === "Pre-pageant"){
          return(
            <div>
              <div>
                  <ButtonGroup>
                      <Button  bsStyle="primary" onClick={this.goToFemale.bind(this)}>Female </Button>
                      <Button style= {boxMargin1} bsStyle="primary" type="button"> Male</Button>
                  </ButtonGroup>
              </div>
              <Grid>
                <Col md={6} mdPull={1}  >
                  <h3 style={titleStyle}>Female Scoring </h3>
                  <div style={imageStyle}>
                    <Image src={this.state.pic_reference[this.props.malescoring.activeCandidate]} circle  width="300" height="400"/>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].candidateNo}</h4>
                      <h5>Candidate #</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].name}</h4>
                      <h5>Name</h5>
                    </div>
                    <div style={nameStyle}>
                      <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].team}</h4>
                      <h5>Team</h5>
                    </div>
                  </div>
                </Col>
                <Col md={6}  mdPull={1} >
                  <br />
                  <PrePageant
                    gender="male"
                    previousCandidate={this.previousCandidate}
                    nextCandidate={this.nextCandidate}
                    onScore={this.onScore}
                    score={this.props.malescoring}
                    />
                  <div style={buttonStyle}>
                      {this.props.malescoring.activeCandidate > 0 ?
                      (<Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                          PREVIOUS </Button>)
                          :
                          <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                          PREVIOUS </Button>}

                      {this.props.malescoring.activeCandidate < this.props.malescoring.candidates.length  -1 ?
                          ( <Button bsSize="large" onClick={this.nextCandidate} bsStyle="primary" type="button" block>
                              NEXT </Button>)
                          :
                           <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
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
        //         <Well>
        //             <div>
        //                 <ButtonGroup>
        //                     <Button onClick={this.goToFemale.bind(this)}  bsStyle="primary">Female </Button>
        //                     <Button style= {boxMargin1} bsStyle="primary" type="button"> Male</Button>
        //                 </ButtonGroup>
        //             </div>
        //
        //           <div style={titleStyle}>Male Scoring </div>
        //
        //             <Grid>
        //                 <Row>
        //                         <Col md={6} mdPull={1}>
        //                             <div style={imageStyle} >
        //                                 <Image src={this.state.pic_reference[this.props.malescoring.activeCandidate]} circle  width="300" height="400"/>
        //                                 <div style={nameStyle}>
        //                                     <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].candidateNo}</h4>
        //                                     <h5>Candidate #</h5>
        //                                 </div>
        //                                 <div style={nameStyle}>
        //                                     <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].name}</h4>
        //                                     <h5>Name</h5>
        //                                 </div>
        //                                 <div style={nameStyle}>
        //                                     <h4 style={textUnderline}>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].team}</h4>
        //                                     <h5>House</h5>
        //                                 </div>
        //                             </div>
        //                         </Col>
        //                         <Col md={6} mdPull={1}>
        //                             <form>
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}>Production Number</ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('production')}
        //                                                 value = {production}/>
        //                                 </FormGroup>
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Talent Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('talent')}
        //                                                 value = {talent}/>
        //                                 </FormGroup>
        //
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Sportswear Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('sportswear')}
        //                                                 value = {sportswear}/>
        //                                 </FormGroup>
        //
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Gown Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('formalWear')}
        //                                                 value = {formalWear}/>
        //                                 </FormGroup>
        //
        //                                 <FormGroup >
        //                                     <ControlLabel style={fontSize2}><h5>Wit &amp; Intelligence Competition</h5></ControlLabel>
        //                                     <ScoreCombo onChange ={this.onScore('qa')}
        //                                                 value = {qa}/>
        //                                 </FormGroup>
        //
        //                                <div style={buttonStyle}>
        //                                         {this.props.malescoring.activeCandidate > 0 ?
        //                                         (<Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
        //                                             PREVIOUS </Button>)
        //                                             :
        //                                             <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
        //                                             PREVIOUS </Button>}
        //
        //                                         {this.props.malescoring.activeCandidate < this.props.malescoring.candidates.length  -1 ?
        //                                             ( <Button bsSize="large" onClick={this.nextCandidate} bsStyle="primary" type="button" block>
        //                                                 NEXT </Button>)
        //                                             :
        //                                              <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
        //
        //                                              NEXT </Button>
        //                                         }
        //
        //                                 </div>
        //                             </form>
        //                         </Col>
        //                 </Row>
        //             </Grid>
        //
        //
        //        </Well>
        // );
    }
}

function mapStateToProps(state) {

    return {
            malescoring: state.malescoring
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        maleScoringActions: bindActionCreators(maleScoringActions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Male);
