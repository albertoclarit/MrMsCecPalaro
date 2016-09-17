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
        ButtonGroup} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux'

import ScoreCombo from './ScoreCombo'


class Female extends React.Component {

    constructor(props){
        super(props);
        
    }
    
      static contextTypes = {
        router: React.PropTypes.object
    };

    
    goToMale(){
        this.props.routerActions.push("/male")

 }
    render(){
        
        const fontSize={
            fontSize: 45
        }
        
        const fontSize2={
            fontWeight: 'bold',
            fontSize: 18
        }
        
        
        const boxMargin={
            marginLeft: 80
        }
        
        const boxMargin1 ={
            marginLeft: 20
        }
        
         
        return (
                <Well>
                    <div>
                        <ButtonGroup>
                            <Button  bsStyle="primary">Female </Button>
                            <Button style= {boxMargin1} bsStyle="primary" onClick={this.goToMale.bind(this)} type="button"> Male</Button>
                        </ButtonGroup>
                    </div>
                
                  <center style={fontSize}>Female Scoring </center>
                  <form>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}>Production Number</ControlLabel>
                            <ScoreCombo />
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}><h5>Talent Compition</h5></ControlLabel>
                            <ScoreCombo />
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}><h5>Gown Compition</h5></ControlLabel>
                            <ScoreCombo />
                        </FormGroup>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}><h5>Sportswear Compition</h5></ControlLabel>
                              <ScoreCombo />
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}><h5>Wit &amp; Intelligence Competition</h5></ControlLabel>
                            <ScoreCombo />
                        </FormGroup>
                            <div>
                                <ButtonGroup>
                                    <Button bsSize="large"  bsStyle="primary" type="submit" style={boxMargin}>
                                    PREVIOUS </Button>
                                    <Button bsSize="large" bsStyle="primary" type="button" style={boxMargin}>
                                    NEXT </Button>
                                  
                                </ButtonGroup>
                            </div>
                   </form>
               </Well>
        );
    }
}


function mapStateToProps(state) {

    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Female);
