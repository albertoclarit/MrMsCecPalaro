/**
 * Created by albertoclarit on 8/15/16.
 */

import React from 'react';
import {
    Well,
    Radio,
    Table,
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';

class CandidateForm extends React.Component {

    constructor(props) {
        super(props);

    }


    state={

    };

    onChange=(name)=>{

        return (e)=>{


            var  data = {};
            data[name] =  e.target.value;
            this.props.candidatelistingactions.updateField(data);

        };

    };

    deleteRecord = ()=>{

        this.props.dialogActions.openConfirm('Are you sure?','Confirm',"OK","CANCEL",(result)=>{

            if(result){
                this.props.candidatelistingactions.deleteCandidate(this.props.selectedCandidate.id);
            }
        });

    };

    saveRecord = ()=>{

        this.props.candidatelistingactions.saveData();

    };

    render(){

        const style={
            width:500,
            height:500,
            marginLeft:'auto',
            marginTop:'50px',
            marginRight:'auto'
        };


        return (
            <div style={style}>
                <form>
                    <FormGroup>
                        <ControlLabel>Enter Candidate No.</ControlLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter Candidate no."
                            value={this.props.selectedCandidate.candidateNo || ''}
                            onChange={this.onChange('candidateNo')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Enter Candidate Name</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter the Candidate Name"
                            value={this.props.selectedCandidate.name || ''}
                            onChange={this.onChange('name')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>

                       <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Gender</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            value={this.props.selectedCandidate.gender || ''}
                            onChange={this.onChange('gender')}>
                            <option value="">----select----</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </FormControl>
                    </FormGroup>


                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Team</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            value={this.props.selectedCandidate.team || ''}
                            onChange={this.onChange('team')}>
                            <option value="">----select---</option>
                            <option value="Dauntless">Dauntless</option>
                            <option value="Erudite">Erudite</option>
                            <option value="Amity">Amity</option>
                            <option value="Abnegation">Abnegation</option>
                            <option value="Candor">Candor</option>
                        </FormControl>
                    </FormGroup>


                    <Button bsStyle="info" onClick={this.saveRecord}>Save Record</Button>

                    {
                        this.props.selectedCandidate.id ?
                        <Button bsStyle="danger" onClick={this.deleteRecord}>Delete Record</Button>
                        :
                        null
                    }

                </form>
            </div>
        );
    }
}

export default CandidateForm;
