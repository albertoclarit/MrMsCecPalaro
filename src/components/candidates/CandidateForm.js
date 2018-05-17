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
            marginLeft:'auto',
            marginTop:'50px',
            marginRight:'auto',
            marginBottom: '20px'
        };


        return (
            <div style={style}>
                <form>
                    <FormGroup>
                        <ControlLabel>Candidate Number</ControlLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter Candidate number"
                            value={this.props.selectedCandidate.candidateNo || ''}
                            onChange={this.onChange('candidateNo')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Candidate Name</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter the Candidate Name"
                            value={this.props.selectedCandidate.name || ''}
                            onChange={this.onChange('name')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Candidate Barangay</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Candidate Address"
                            value={this.props.selectedCandidate.address || ''}
                            onChange={this.onChange('address')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>


                    <FormGroup>
                        <ControlLabel>Candidate age</ControlLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter Candidate age"
                            value={this.props.selectedCandidate.age || ''}
                            onChange={this.onChange('age')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>


                    <Button bsStyle="info" bsSize="small" onClick={this.saveRecord}>Save Record</Button>

                    {
                        this.props.selectedCandidate.id ?
                        <Button bsStyle="danger" bsSize="small" onClick={this.deleteRecord} style={{ marginLeft: '20px'}} >Delete Record</Button>
                        :
                        null
                    }

                </form>
            </div>
        );
    }
}

export default CandidateForm;
