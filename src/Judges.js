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
            fontSize: 50
        }
        
        const wellStyle={
            width: 400,
            height: 500,
            marginLeft: 650,
            marginTop: 30
        }
        
        const boxMargin={
            marginLeft: 80
        }
        
        return (
            <Well style={wellStyle}>
                  <center style={fontSize}>Judges Page </center>
                  <form>
                    
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Candidate Number</ControlLabel>
                        <FormControl 
                            componentClass="select" 
                            placeholder="select">
                            <option value="team">select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </FormControl>
                    </FormGroup>
                     <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Candidate Number</ControlLabel>
                        <FormControl 
                            componentClass="select" 
                            placeholder="select">
                            <option value="team">select</option>
                            <option value="1">10</option>
                            <option value="1">15</option>
                            <option value="2">20</option>
                            <option value="2">25</option>
                            <option value="3">30</option>
                            <option value="3">35</option>
                            <option value="4">40</option>
                            <option value="4">45</option>
                            <option value="5">50</option>
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

