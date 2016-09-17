/**
 * Created by albertoclarit on 8/15/16.
 */

import React from 'react';
import {
    Well,
<<<<<<< HEAD
=======
    Radio,
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
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
<<<<<<< HEAD

    }

=======
        

    }

state={
    
}

>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
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
<<<<<<< HEAD
                            placeholder="Enter the Candidateno"
=======
                            placeholder="Enter Candidate no."
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
                            value={this.props.selectedCandidate.candidateNo || ''}
                            onChange={this.onChange('candidateNo')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
<<<<<<< HEAD
=======
                    
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
                    <FormGroup>
                        <ControlLabel>Enter Candidate Name</ControlLabel>
                        <FormControl
                            type="text"
<<<<<<< HEAD
                            placeholder="Enter the Candidate Name"
=======
                            placeholder="Enter Candidate Name"
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
                            value={this.props.selectedCandidate.name || ''}
                            onChange={this.onChange('name')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup> 
                   
<<<<<<< HEAD
=======
                       <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Gender</ControlLabel>
                        <FormControl 
                            componentClass="select" 
                            placeholder="select" 
                            value={this.props.selectedCandidate.gender || ''} 
                            onChange={this.onChange('gender')}>
                            <option value="gender">select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            
                        </FormControl>
                    </FormGroup>
                  
                   
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Team</ControlLabel>
                        <FormControl 
                            componentClass="select" 
                            placeholder="select" 
                            value={this.props.selectedCandidate.team || ''} 
                            onChange={this.onChange('team')}>
                            <option value="team">select</option>
<<<<<<< HEAD
                            <option value="IIAS">IIAS</option>
                            <option value="EdCriBa">EdCriBa</option>
                            <option value="Chieftains">Chieftains</option>
                            <option value="Cruisers">Cruisers</option>
=======
                            <option value="Targaryen">Targaryen</option>
                            <option value="Lannister">Lannister</option>
                            <option value="Baratheon">Baratheon</option>
                            <option value="Stark">Stark</option>
                            <option value="Arryn">Arryn</option>
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
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
