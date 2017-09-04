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
  import validation from 'react-validation-mixin';
  import strategy from 'react-validatorjs-strategy';
  import validatorjs from 'validatorjs';
  import classnames from 'classnames';


class JudgeForm extends React.Component {

    constructor(props) {
        super(props);



    this.validatorTypes=strategy.createSchema(
        {
            judgeNo:'required',
            password: 'required',
            event: 'required',
            username: 'required',
        },
        {
            "required":"The field :attribute is required!"
        },
        (validator)=>{
        validator.setAttributeNames({
            judgeNo: 'Judge Number',
            password: 'Password',
            event: 'Event',
            username: 'Username'
        });
        });

    }




        getValidatorData = ()=> {
                return this.props.selectedJudge
            };

        getClasses = (field)=>{

                return classnames({
                    'success': this.props.isValid(field),
                    'error': !this.props.isValid(field)
                });
        };

        onFormSubmit = (event)=>{
            event.preventDefault();

            this.setState({
            validated:true
            });

            this.props.validate(this.onValidate);
        };

        getErrorText=(field)=>{
                var error = this.props.errors[field];
                if(!error)
                    return null;
                if(Array.isArray(error)){
                    var message = [];
                    message = error.map((item,i)=>{
                        return(
                            <span key={i}>
                                {item}
                                <br/>
                            </span>
                        )
                    });
                    return message;
                }
                else
                    return  (<span>{error || ''}</span>);
            };


        onValidate=(error)=>{
            if (error) {
               event.preventDefault();
            } else {
            // submit to rest here
            this.saveRecord()
            }
        };


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
                <form onSubmit={this.onFormSubmit}>
                    <FormGroup validationState={this.getClasses('judgeNo')}>
                        <ControlLabel>Enter Judge Username</ControlLabel>
                        <FormControl
                            type="text"
                            name="username"
                            placeholder="Enter the Judge Username"
                            value={this.props.selectedJudge.username || ''}
                            onChange={this.onChange('username')}
                             onBlur={()=>{
                                this.setState({
                                    validated:true
                                });
                                    this.props.validate('username');
                                    }
                                }
                            />
                        <FormControl.Feedback/>
                        <HelpBlock>{this.getErrorText('username')}</HelpBlock>
                    </FormGroup>
                    <FormGroup validationState={this.getClasses('judgeNo')}>
                        <ControlLabel>Enter Judge Number</ControlLabel>
                        <FormControl
                            type="text"
                            name="judgeNo"
                            placeholder="Enter the Judgeno"
                            value={this.props.selectedJudge.judgeNo || ''}
                            onChange={this.onChange('judgeNo')}
                             onBlur={()=>{
                                this.setState({
                                    validated:true
                                });
                                    this.props.validate('judgeNo');
                                    }
                                }
                            />
                        <FormControl.Feedback/>
                        <HelpBlock>{this.getErrorText('judgeNo')}</HelpBlock>
                    </FormGroup>
                    <FormGroup validationState={this.getClasses('password')}>
                        <ControlLabel>Enter Password</ControlLabel>
                        <FormControl
                            type="text"
                            name="password"
                            placeholder="Enter the Password"
                            value={this.props.selectedJudge.password || ''}
                            onChange={this.onChange('password')}
                            onBlur={()=>{
                                this.setState({
                                    validated:true
                                });
                                    this.props.validate('password');
                                    }
                                }
                            />

                        <FormControl.Feedback/>
                        <HelpBlock>{this.getErrorText('password')}</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect" validationState={this.getClasses('password')}>
                        <ControlLabel>Team</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="Select Event"
                            value={this.props.selectedJudge.event || ''}
                            onChange={this.onChange('event')}
                            onBlur={()=>{
                                this.setState({
                                    validated:true
                                });
                                    this.props.validate('event');
                                    }
                                }>
                            <option value="">----select---</option>
                            <option value="Pre-pageant">Pre-pageant</option>
                            <option value="Talent">Talent</option>
                            <option value="Coronation">Coronation</option>
                        </FormControl>
                        <HelpBlock>{this.getErrorText('event')}</HelpBlock>
                    </FormGroup>
                    <Button bsStyle="info" type="submit">Save Record</Button>

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

export default validation(strategy)(JudgeForm);
