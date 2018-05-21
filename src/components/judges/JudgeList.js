/**
 * Created by albertoclarit on 8/15/16.
 */
import React from 'react';
import {Well,
       Table,
       Button
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from '../../actions/dialogactions';
import * as judgelistingactions  from '../../actions/judgelistingactions';
import { routerActions } from 'react-router-redux'
import { Modal,Row,Col } from 'antd';


 class JudgeList extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            modal1: false,
            modal2: false
        }

    }

     componentDidMount(){

          this.props.judgelistingactions.loadJudges();
     }

     addJudge = ()=>{


         this.props.routerActions.push('/admin/judgeslist_add');
     };

     editJudge = (id)=>{

         return ()=>{
             this.props.routerActions.push('/admin/judgeslist/'+ id);
         };
     };

     showModal1 = () =>{
         this.setState({
             modal1: true
         });
     }

     showModal2 = () =>{
        this.setState({
            modal2: true
        });
    }

     handleOk = (e) => {
        console.log(e);
        this.setState({
          modal1: false,
          modal2: false
        });
      }
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          modal1: false,
          modal2: false
        });
      }


    render(){

        var rows = this.props.judgelisting.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>{item.judgeNo != 999 ?
                         <Button bsSize="small"  bsStyle="warning" onClick={this.editJudge(item.id)}>Edit</Button>
                         :null} </td>
                     <td>{item.username}</td>
                     <td>{item.judgeNo}</td>
                     <td>{item.password}</td>
                     <td>{item.event}</td>
                </tr>
            );
        });

        return (
            <Well>

                <center>
                     <h3>Judge Listings</h3>
                </center>

                <Table striped bordered condensed >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Judge Username</th>
                        <th>Judge No</th>
                        <th>Password</th>
                        <th>Event</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Row>
                    <Col span={8}><Button bsStyle="primary" bsSize="small" onClick={this.addJudge}>Add a Judge </Button></Col>
                    <Col span={2} offset={13}><Button bsStyle="primary" bsSize="small" onClick={this.showModal1}>Modal1</Button></Col>
                    <Col span={1}><Button bsStyle="primary" bsSize="small" onClick={this.showModal2}>Modal2</Button></Col>
                </Row>

                <Modal
                title="Modal 1"
                visible={this.state.modal1}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <Modal
                title="Modal 2"
                visible={this.state.modal2}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

            </Well>
        );
    }
}

function mapStateToProps(state) {

    return {
    judgelisting:state.judgelisting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
        judgelistingactions: bindActionCreators(judgelistingactions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(JudgeList);
