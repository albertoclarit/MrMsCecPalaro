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


 class JudgeList extends React.Component {

    constructor(props) {
        super(props);

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


    render(){

        var rows = this.props.judgelisting.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>{item.judgeNo != 999 ?
                         <Button bsSize="small"  bsStyle="warning" onClick={this.editJudge(item.id)}>Edit</Button>
                         :null} </td>
                     <td>{item.judgeNo}</td>
                     <td>{item.password}</td>
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
                        <th>Judge No</th>
                        <th>Password</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Button bsStyle="primary" onClick={this.addJudge}>Add a Judge </Button>


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

