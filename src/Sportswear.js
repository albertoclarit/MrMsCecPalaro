/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well} from 'react-bootstrap';
import * as candidatelistingactions  from './actions/candidatelistingactions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';


class Sportswear extends React.Component {

    constructor(props){
        super(props);
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
                <h2> Sportswear </h2>
                </center>
            
<<<<<<< HEAD
=======
                <p>Male</p>

>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
                <table className="table table-striped table-hover ">
                    
                    <thead>
                        <tr>
                        <th>Candidate #</th>
                        <th>Judge 1</th>
                        <th>Judge 2</th>
                        <th>Judge 3</th>
<<<<<<< HEAD
=======
                        <th>Judge 4</th>
                        <th>Judge 5</th>
                        <th>Average</th>
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
<<<<<<< HEAD
=======
                    </tbody>
              </table>
              
              <p>Female</p>

                <table className="table table-striped table-hover ">
                    
                    <thead>
                        <tr>
                        <th>Candidate #</th>
                        <th>Judge 1</th>
                        <th>Judge 2</th>
                        <th>Judge 3</th>
                        <th>Judge 4</th>
                        <th>Judge 5</th>
                        <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
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

export default connect(mapStateToProps,mapDispatchToProps)(Sportswear);



