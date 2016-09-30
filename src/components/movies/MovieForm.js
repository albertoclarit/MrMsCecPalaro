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

class MovieForm extends React.Component {

    constructor(props) {
        super(props);

    }


    state={

    };

    onChange=(name)=>{

        return (e)=>{


            var  data = {};
            data[name] =  e.target.value;
            this.props.movielistingactions.updateField(data);

        };

    };

    deleteRecord = ()=>{

        this.props.dialogActions.openConfirm('Are you sure?','Confirm',"OK","CANCEL",(result)=>{

            if(result){
                this.props.movielistingactions.deleteMovie(this.props.selectedMovie.id);
            }
        });

    };

    saveRecord = ()=>{

        this.props.movielistingactions.saveData();

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
                        <ControlLabel>Enter Movie No.</ControlLabel>
                        <FormControl
                            type="number"
                            placeholder="Enter Movie no."
                            value={this.props.selectedMovie.movieNo || ''}
                            onChange={this.onChange('movieNo')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Enter Movie Title</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter the Movie Title"
                            value={this.props.selectedMovie.title || ''}
                            onChange={this.onChange('title')}
                            />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                  
                    
                    <Button bsStyle="info" onClick={this.saveRecord}>Save Record</Button>

                    {
                        this.props.selectedMovie.id ?
                        <Button bsStyle="danger" onClick={this.deleteRecord}>Delete Record</Button>
                        :
                        null
                    }

                </form>
            </div>
        );
    }
}

export default MovieForm;
