/**
 * Created by albertoclarit on 12/15/15.
 */

import React from 'react';
import { Modal,Button} from 'react-bootstrap';
import classNames from 'classnames';
import objectAssign from 'object-assign';

require('./AlertModal.css');



export default  class AlertModal  extends   React.Component{
    static propTypes = {
        message: React.PropTypes.string,
        title: React.PropTypes.string,
        isOpen:React.PropTypes.bool.isRequired,
        type:React.PropTypes.oneOf(['info','success','warning','success','primary','danger']),
        onClosed:React.PropTypes.func,
        dialogActions:React.PropTypes.object.isRequired
    };


    constructor(props){
        super(props);
    }

    close =()=>{
        if(this.props.dialogActions)
            this.props.dialogActions.closeAlert();

    if(this.props.onClosed)
       this.props.onClosed();
    };


    render(){

       // console.log(this.props.type);
        var dialogstyle = classNames({
            "info": this.props.type ==='info'|| !this.props.type,
            "warning": this.props.type ==='warning',
            "danger": this.props.type ==='danger',
            "success": this.props.type ==='success',
            "primary": this.props.type ==='primary'
        });


        return (

            <Modal show={this.props.isOpen} onHide={this.close}
                   dialogClassName={dialogstyle}
               >
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
                    <Button bsStyle={dialogstyle} onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
