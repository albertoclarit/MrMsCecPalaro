/**
 * Created by albertoclarit on 8/15/16.
 */

import React from 'react';
import {
    Well,
    Table,
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';

class JudgeForm extends React.Component {

    constructor(props) {
        super(props);

    }

    onChange=(name)=>{

        return (e)=>{


            var  data = {};
            data[name] =  e.target.value;
            this.props.judgelistingactions.updateField(data);

        };

    };

    deleteRecord = ()=>{

        this.props.dialogActions.openConfirm('Are you sure?','Confirm',"OK","CANCEL",(result)=>{

            if(result){
                this.props.judgelistingactions.deleteJudge(this.props.selectedJudge.id);
            }
        });

    };

    saveRecord = ()=>{

        this.props.judgelistingactions.saveData();

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
                        <ControlLabel>Enter JudgeNo</ControlLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter the Judgeno"
                            value={this.props.selectedJudge.judgeNo || ''}
                            onChange={this.onChange('judgeNo')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Enter Password</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter the password"
                            value={this.props.selectedJudge.password || ''}
                            onChange={this.onChange('password')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <Button bsStyle="info" onClick={this.saveRecord}>Save Record</Button>

                    {
                        this.props.selectedJudge.id ?
                        <Button bsStyle="danger" onClick={this.deleteRecord}>Delete Record</Button>
                        :
                        null
                    }

                </form>
            </div>
        );
    }
}

export default JudgeForm;
