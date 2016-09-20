/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well} from 'react-bootstrap';
import * as loadmalecandidatesaction  from '../../actions/loadmalecandidatesaction.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux'; 

class Witandint extends React.Component {

    constructor(props){
        super(props);
    }


    componentDidMount(){

          this.props.loadmalecandidatesaction.loadMaleCandidates();
     }


    render(){
        
        const wellStyle={
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        
        
           var rowsMale = this.props.loadmalecandidates.maleCandidates.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>{item.name}</td>
                </tr>
            );
        });

        
          var rowsFemale = this.props.loadmalecandidates.femaleCandidates.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>{item.name}</td>
                </tr>
            );
        });
        
        return (
            <Well style={wellStyle}>
                
                <center>
                <h2> Wit &amp; Intelligence</h2>
                </center>

                <h3>Male</h3>
            
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                        <th>Candidate Name</th>
                        <th>Judge 1</th>
                        <th>Judge 2</th>
                        <th>Judge 3</th>
                        <th>Judge 4</th>
                        <th>Judge 5</th>
                        <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                       {rowsMale}
                    </tbody>
              </table> 

              <h3>Female</h3>
            
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                        <th>Candidate Name</th>
                        <th>Judge 1</th>
                        <th>Judge 2</th>
                        <th>Judge 3</th>
                        <th>Judge 4</th>
                        <th>Judge 5</th>
                        <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                       {rowsFemale}
                    </tbody>
              </table> 
            </Well>
            
        );
    }
}


function mapStateToProps(state) {

    return {
        loadmalecandidates:state.loadmalecandidates
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        loadmalecandidatesaction: bindActionCreators(loadmalecandidatesaction, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Witandint);
