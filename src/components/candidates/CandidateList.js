import React from 'react';
import {Well,
       Table,
       Button
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from '../../actions/dialogactions';
import * as candidatelistingactions  from '../../actions/candidatelistingactions';
import { routerActions } from 'react-router-redux'

class CandidateList extends React.Component{
    constructor (props){
        super(props);
    }


     componentDidMount(){

          this.props.candidatelistingactions.loadCandidates();
     }

      addCandidate = ()=>{


         this.props.routerActions.push('/admin/candidateslist_add');
     };

     editCandidate = (id)=>{

         return ()=>{
             this.props.routerActions.push('/admin/candidateslist/'+ id);
         };
     };


    render(){

        var rows = this.props.candidatelisting.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>
                         <Button bsSize="small"  bsStyle="warning" onClick={this.editCandidate(item.id)}>Edit</Button>
                         </td>
                     <td>{item.candidateNo}</td>
                     <td>{item.name}</td>
                     <td>{item.age}</td>
                     <td>{item.address}</td>
                </tr>
            );
        });

        return (
            <Well>

                <center>
                    <h3>Candidate Listings</h3>
                </center>

                <Table striped bordered condensed id="candidates">
                    <thead>
                    <tr>
                        <th>Options</th>
                        <th>Candidate No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Barangay</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Button bsStyle="primary" bsSize="small" onClick={this.addCandidate}>Add a Candidate </Button>


            </Well>
        );
    }
}

function mapStateToProps(state) {

    return {
    candidatelisting:state.candidatelisting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
        candidatelistingactions: bindActionCreators(candidatelistingactions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CandidateList);
