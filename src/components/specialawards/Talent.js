/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well
        } from 'react-bootstrap';
import * as besttalentactions  from '../../actions/besttalentactions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';


class Talent extends React.Component {

    constructor(props){
        super(props);

       // loadinitial
        this.props.besttalentactions.loadbesttalentmale();
    }
    State={
        selectedKey:1
    };

    componentDidMount(){



        this.interval = setInterval(()=>{

            this.props.besttalentactions.loadbesttalentmale();

        },1500); // every 1.5 seconds refresg

     }

    componentWillUnmount(){

        if( this.interval)
        clearInterval( this.interval);
    }
    
    render(){
        
        const wellStyle={
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        
           var rows = this.props.besttalent.records.map((item,i)=>{

               var othertds = [];

                var noOfJudge = item.judgeTotal;

                for(var x=0;x<noOfJudge;x++){
                    othertds.push(<td key={x}>{(item['judge'+(x+1)].talent)}</td>)
                }

            return (
                <tr key={i}>
                     <td>{item.candidateNo}</td>
                     <td>{item.name}</td>
                    {othertds}
                    <td>{item.average}</td>
                </tr>
            );
        });

        
        
        return (
            <Well style={wellStyle}>
            
                <center>
                <h2> Talent</h2>
                </center>
                <h3>Male</h3>

                <table className="table table-striped table-hover ">
                    
                    <thead>
                        <tr>
                        <th>Candidate No</th>
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
                        {rows}
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
                        
                    </tbody>
              </table>
              
              
            </Well>
            
        );
    }
}


function mapStateToProps(state) {

    return {
        besttalent:state.besttalent
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        besttalentactions: bindActionCreators(besttalentactions, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Talent);



