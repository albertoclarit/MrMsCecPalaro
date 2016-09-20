/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup,
        ButtonToolbar} from 'react-bootstrap';
import * as candidatelistingactions  from './actions/candidatelistingactions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';



class Scoreboard extends React.Component {

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
                     <td>{item.name}</td>
                </tr>
            );
        });
        
        return (
            <Well style={wellStyle}>
            
                <center>
                <h2> Final Ranking </h2>
                </center>
                <Button block bsStyle="warning">Reset Scores</Button>
                <h3> Male </h3>


                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>Production 15%</th>
                            <th>Talent 15%</th>
                            <th>Sportswear 10%</th>
                            <th>Formal Wear 20%</th>
                            <th>Wit &amp; Intelligent 40%</th>
                            <th>Total 100%</th>
                            <th>Ranking</th>
                        </tr>

                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
              </table>
              
              <h3> Female </h3>
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Production 15%</th>
                        <th>Talent 15%</th>
                        <th>Sportswear 10%</th>
                        <th>Formal Wear 20%</th>
                        <th>Wit &amp; Intelligent 40%</th>
                        <th>Total 100%</th>
                        <th>Ranking</th>
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

export default connect(mapStateToProps,mapDispatchToProps)(Scoreboard);


