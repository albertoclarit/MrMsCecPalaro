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


export default class Judges extends React.Component {

    constructor(props){
        super(props);
        
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
        
        return (
            
                <Well>
                  <center style={fontSize}>Scoring </center>
                  <form>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}>Talent Competition</ControlLabel>
                            <FormControl
                                componentClass="select" 
                                placeholder="select">
                                <option value="">0</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}><h5>Gown Competition</h5></ControlLabel>
                            <FormControl 
                                componentClass="select" 
                                placeholder="select">
                                <option value="">0</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}><h5>Sportswear Competition</h5></ControlLabel>
                            <FormControl 
                                componentClass="select" 
                                placeholder="select">
                                <option value="">0</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel style={fontSize2}><h5>Wit & Intelligence Competition</h5></ControlLabel>
                            <FormControl 
                                componentClass="select" 
                                placeholder="select">
                                <option value="">0</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                            </FormControl>
                        </FormGroup>
                            <div>
                                <ButtonGroup>
                                    <Button bsSize="large"  bsStyle="primary" type="submit" style={boxMargin}>
                                    BACK </Button>
                                    <Button bsSize="large" bsStyle="primary" type="button" style={boxMargin}>
                                    NEXT </Button>
                                </ButtonGroup>
                            </div>
                   </form>
               </Well>
        );
    }
}

