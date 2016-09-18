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

    
     goToFemale(){
         this.props.routerActions.push("/female")
 }
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
    
    
    previousCandidate=()=>{

        this.props.maleScoringActions.previousCandidate(this.props.malescoring.activeCandidate-1);

    };

    nextCandidate=()=>{
        this.props.maleScoringActions.nextCandidate(this.props.malescoring.activeCandidate + 1);
    };

     componentDidMount(){
         this.props.maleScoringActions.loadMaleCandidates();
     }
     
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
        }
        
        const boxMargin1={
            marginLeft: 20
        }
   
          if( this.props.malescoring.candidates.length==0)
          return null;
        
        return (
               
                <Well>
                    <div>
                        <ButtonGroup>
                            <Button onClick={this.goToFemale.bind(this)}  bsStyle="primary">Female </Button>
                            <Button style= {boxMargin1} bsStyle="primary" type="button"> Male</Button>
                        </ButtonGroup>
                    </div>
                
                  <div style={titleStyle}>Male Scoring </div>

                    <Grid>
                        <Row>
                                <Col md={6}>
                                    <div>
                                        <Image src={this.state.pic_reference[this.props.malescoring.activeCandidate]} circle  width="300" height="400"/>
                                        <h4>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].name}</h4>
                                        <h4>{this.props.malescoring.candidates[this.props.malescoring.activeCandidate].team}</h4>
                                    </div>
                                </Col>
                                <Col md={6} mdPull={1}>
                                    <form>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}>Production Number</ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Talent Compition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Gown Compition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Sportswear Compition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Wit &amp; Intelligence Competition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
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
                                                         NEXT </Button>}
                                        </div>
                                    </form>
                                </Col>
                        </Row>
                    </Grid>


               </Well>
        );
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
