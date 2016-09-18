/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well} from 'react-bootstrap';
import * as candidatelistingactions  from '../../actions/candidatelistingactions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';


class Gown extends React.Component {

    constructor(props){
        super(props);
    }

      componentDidMount(){

          this.props.candidatelistingactions.loadCandidates();
     }


    render(){
        
        const wellStyle={
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        
         var rows = this.props.candidatelisting.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>{item.candidateNo}</td>
                </tr>
            );
        });
        
        return (
            <Well style={wellStyle}>
                
                <center>
                    <h2>  Formal Wear </h2>
                </center>
                
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                        <th>Candidate #</th>
                        <th>Judge 1</th>
                        <th>Judge 2</th>
                        <th>Judge 3</th>
                        </tr>
                    </thead>
                    <tbody>
                     {rows}
                    </tbody>
              </table> 
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
        routerActions: bindActionCreators(routerActions, dispatch),
        candidatelistingactions: bindActionCreators(candidatelistingactions, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Gown);




