/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Well ,Button
        } from 'react-bootstrap';
import * as besttalentactions  from '../../actions/besttalentactions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';


class Talent extends React.Component {

    constructor(props){
        super(props);

       // loadinitial
        // this.props.besttalentactions.loadbesttalentmale();
        this.props.besttalentactions.loadbesttalentfemale();

    }
    State={
        selectedKey:1
    };

    componentDidMount(){



        this.interval = setInterval(()=>{

            // this.props.besttalentactions.loadbesttalentmale();
            this.props.besttalentactions.loadbesttalentfemale();
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

        var totalJudgeTd = [];

         if(this.props.besttalent.recordsFemale.length>0){

             var countJudge = this.props.besttalent.recordsFemale[0].judgeTotal;

             for(var i=0;i<countJudge;i++)
                 totalJudgeTd.push(<th key={i}>Judge #{i+1}</th>);
         }

        var rowsFemale = this.props.besttalent.recordsFemale.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judge'+(x+1)].talent)}</td>)
            }

            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    {othertds}
                    <td>{item.average}</td>
                    <td>{i+1}</td>
                </tr>
            );
        });




        return (
            <Well style={wellStyle} id="talent">

                <center>
                <h2> Talent</h2>
                </center>

                <table className="table table-striped table-hover ">

                    <thead>
                        <tr>
                        <th>Candidate No</th>
                        <th>Candidate Name</th>
                            {totalJudgeTd}
                        <th>Average</th>
                        <th>Rank</th>
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
