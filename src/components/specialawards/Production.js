/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Well, Button} from 'react-bootstrap';
import * as bestproductionactions  from '../../actions/bestproductionactions';
import Promise from 'bluebird';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';


class Production extends React.Component {

    constructor(props){
        super(props);

        this.props.bestproductionactions.loadbestproductionmale();
        this.props.bestproductionactions.loadbestproductionfemale();
    }



    componentDidMount(){



        this.interval = setInterval(()=>{

            this.props.bestproductionactions.loadbestproductionmale();
            this.props.bestproductionactions.loadbestproductionfemale();
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

        if(this.props.bestproduction.recordsMale.length>0){

            var countJudge = this.props.bestproduction.recordsMale[0].judgeTotal;

            for(var i=0;i<countJudge;i++)
                totalJudgeTd.push(<th key={i}>Judge #{i+1}</th>);
        }


        var rowsMale = this.props.bestproduction.recordsMale.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judge'+(x+1)].production)}</td>)
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


        var rowsFemale = this.props.bestproduction.recordsFemale.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judge'+(x+1)].production)}</td>)
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
            <Well style={wellStyle}>

                <center>
                  <h2>  Production </h2>
                </center>

              <h3>Female</h3>

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

              <h3>Male</h3>

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
                  {rowsMale}
                </tbody>
              </table>
              </Well>

        );
    }
}

function mapStateToProps(state) {

    return {
        bestproduction:state.bestproduction
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        bestproductionactions: bindActionCreators(bestproductionactions, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Production);
