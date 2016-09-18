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


class Female extends React.Component {

    constructor(props){
        super(props);



    }

    state = {
        pic_reference:[]
    };
    
      static contextTypes = {
        router: React.PropTypes.object
    };

    
    goToMale(){
        this.props.routerActions.push("/male")

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

        this.props.femaleScoringActions.previousCandidate(this.props.femalescoring.activeCandidate-1);

    };

    nextCandidate=()=>{
        this.props.femaleScoringActions.nextCandidate(this.props.femalescoring.activeCandidate + 1);
    };


     componentDidMount(){
         this.props.femaleScoringActions.loadFemaleCandidates();
     }
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



        return (



                <Well>
                    <div>
                        <ButtonGroup>
                            <Button  bsStyle="primary">Female </Button>
                            <Button style= {boxMargin1} bsStyle="primary" onClick={this.goToMale.bind(this)} type="button"> Male</Button>
                        </ButtonGroup>
                    </div>
                
                  <h3 style={titleStyle}>Female Scoring </h3>

                    <Grid>
                        
                                <Col md={6} mdPull={1}  >
                                    <div style={imageStyle}>
                                        <Image src={this.state.pic_reference[this.props.femalescoring.activeCandidate]} circle  width="300" height="400"/>
                                        <div style={nameStyle}>
                                            <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].name}</h4>
                                            <h5>Name</h5>
                                        </div>
                                        <div style={nameStyle}>
                                            <h4 style={textUnderline}>{this.props.femalescoring.candidates[this.props.femalescoring.activeCandidate].team}</h4>
                                            <h5>House</h5>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}  mdPull={1} >
                                    <form>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}>Production Number</ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Talent Competition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Gown Competition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Sportswear Competition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                        <FormGroup >
                                            <ControlLabel style={fontSize2}><h5>Wit &amp; Intelligence Competition</h5></ControlLabel>
                                            <ScoreCombo />
                                        </FormGroup>
                                            <div style={buttonStyle}>
                                                {this.props.femalescoring.activeCandidate > 0 ?
                                                (<Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" block>
                                                    PREVIOUS </Button>)
                                                    :
                                                    <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
                                                    PREVIOUS </Button>}

                                                {this.props.femalescoring.activeCandidate < this.props.femalescoring.candidates.length  -1 ?
                                                    ( <Button bsSize="large" onClick={this.nextCandidate} bsStyle="primary" type="button" block>
                                                        NEXT </Button>)
                                                    :
                                                     <Button bsSize="large" onClick={this.previousCandidate}  bsStyle="primary" type="button" disabled block>
<<<<<<< HEAD
                                                    NEXT </Button>}
=======
                                                         NEXT </Button>}
>>>>>>> 775483ec35ce69159ebaf9738d510de7f3e28951
                                            </div>              
                                    </form>
                                </Col>
                    </Grid>


               </Well>
        );
    }
}


function mapStateToProps(state) {
    return {
        femalescoring: state.femalescoring
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        femaleScoringActions: bindActionCreators(femaleScoringActions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Female);
