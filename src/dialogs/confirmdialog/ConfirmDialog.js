/**
 * Created by albertoclarit on 12/27/15.
 */
import React from 'react';
import { Modal,Button} from 'react-bootstrap';
import classNames from 'classnames';

require('./ConfirmDialog.css');


export default class ConfirmDialog extends  React.Component{
   static propTypes = {
        message: React.PropTypes.string,
        title: React.PropTypes.string,
        isOpen:React.PropTypes.bool.isRequired,
        confirmLabel:React.PropTypes.string,
        cancelLabel:React.PropTypes.string,
        onClosed:React.PropTypes.func,
        dialogActions:React.PropTypes.object.isRequired
    };


    constructor(props){
        super(props);
    }


    close=(status)=>{

        if(status){
            return ()=>{

                if(this.props.dialogActions)
                    this.props.dialogActions.closeConfirm();

                if(this.props.onClosed)
                    this.props.onClosed(true);
            };
        }
        else {
            return ()=>{


                if(this.props.dialogActions)
                    this.props.dialogActions.closeConfirm();


                if(this.props.onClosed)
                    this.props.onClosed(false);
            };

        }
    };


    render(){

        // console.log(this.props.type);
        var dialogstyle = classNames({
            "warning": true
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
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.close(true)}>{this.props.confirmLabel || this.props.confirmLabel}</Button>
                    <Button bsStyle="warning" onClick={this.close(false)}>{this.props.cancelLabel || this.props.cancelLabel}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
