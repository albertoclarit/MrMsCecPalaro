/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well} from 'react-bootstrap';
import * as bestformalWearactions  from '../../actions/bestformalWearactions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

class Gown extends React.Component {

    constructor(props){
        super(props);
        this.props.bestformalWearactions.loadbestformalWearmale();
        this.props.bestformalWearactions.loadbestformalWearfemale();

    }

    componentDidMount(){

        this.interval = setInterval(()=>{

            this.props.bestformalWearactions.loadbestformalWearmale();
            this.props.bestformalWearactions.loadbestformalWearfemale();
        },1500); // every 1.5 seconds refresh
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

        if(this.props.bestformalWear.recordsMale.length>0){

            var countJudge = this.props.bestformalWear.recordsMale[0].judgeTotal;

            for(var i=0;i<countJudge;i++)
                totalJudgeTd.push(<th key={i}>Judge #{i+1}</th>);
        }


        var rowsMale = this.props.bestformalWear.recordsMale.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judge'+(x+1)].formalWear)}</td>)
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


        var rowsFemale = this.props.bestformalWear.recordsFemale.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judge'+(x+1)].formalWear)}</td>)
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
                    <h2> Formal Wear</h2>
                </center>

                <p>Male</p>

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

                <p>Female</p>

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
        bestformalWear:state.bestformalWear
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        bestformalWearactions: bindActionCreators(bestformalWearactions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Gown);
