/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well} from 'react-bootstrap';
import * as bestswimsuitactions  from '../../actions/bestswimsuitactions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';


class Swimsuit extends React.Component {

    constructor(props){
        super(props);


        // this.props.bestswimsuitactions.loadbestsportswearmale();
        this.props.bestswimsuitactions.loadbestswimsuitfemale();

    }
    componentDidMount(){

        this.interval = setInterval(()=>{

            // this.props.bestswimsuitactions.loadbestsportswearmale();
            this.props.bestswimsuitactions.loadbestswimsuitfemale();
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

        if(this.props.bestswimsuit.recordsFemale.length>0){

            var countJudge = this.props.bestswimsuit.recordsFemale[0].judgeTotal;

            for(var i=0;i<countJudge;i++)
                totalJudgeTd.push(<th key={i}>Judge #{i+1}</th>);
        }

        var rowsFemale = this.props.bestswimsuit.recordsFemale.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judge'+(x+1)].swimsuit)}</td>)
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
                <h2> Swimsuit </h2>
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
        bestswimsuit:state.bestswimsuit
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        bestswimsuitactions: bindActionCreators(bestswimsuitactions, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Swimsuit);
