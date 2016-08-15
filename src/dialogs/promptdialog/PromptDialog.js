/**
 * Created by albertoclarit on 1/26/16.
 */
import React from 'react';
import { Modal,Button} from 'react-bootstrap';
import classNames from 'classnames';

export default class PromptDialog extends  React.Component{

    static propTypes= {
        message: React.PropTypes.string,
        title: React.PropTypes.string,
        isOpen:React.PropTypes.bool.isRequired,
        onClosed:React.PropTypes.func,
        dialogActions:React.PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
    }


    close=(result)=>{

        return ()=>{

            if(this.props.dialogActions)
                this.props.dialogActions.closePrompt();


            if(result){

                var value = this.refs.input.value;

                if(this.props.onClosed)
                    this.props.onClosed(value);
            }
            else {
                if(this.props.onClosed)
                    this.props.onClosed(false);
            }
        }
    };


    render(){

        // console.log(this.props.type);
        var dialogstyle = classNames({
            "primary": true
        });


        return (

            <Modal show={this.props.isOpen} onHide={this.close(false)}
                   dialogClassName={dialogstyle}>
                <Modal.Header
                    closeButton
                    >
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div dangerouslySetInnerHTML={{"__html":this.props.message}}>
                    </div>

                    <input type="text" className="form-control" ref="input" />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.close(true)}>OK</Button>
                    <Button bsStyle="warning" onClick={this.close(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
