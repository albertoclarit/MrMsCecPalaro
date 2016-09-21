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
import * as finalrankingactions  from './actions/finalrankingactions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';



class Scoreboard extends React.Component {

    constructor(props){
        super(props);

        this.props.finalrankingactions.loadfinalranking();

    }

    componentDidMount(){

        this.interval = setInterval(()=>{

            this.props.finalrankingactions.loadfinalranking();
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

        var rowsMale = this.props.finalranking.recordsMale.map((item,i)=>{

            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.production.toFixed(2)}</td>
                    <td>{item.talent.toFixed(2)}</td>
                    <td>{item.sportswear.toFixed(2)}</td>
                    <td>{item.formalWear.toFixed(2)}</td>
                    <td>{item.qa.toFixed(2)}</td>
                    <td>{item.totalAverage.toFixed(2)}</td>
                    <td>{i+1}</td>
                </tr>
            );
        });

        var rowsFemale = this.props.finalranking.recordsFemale.map((item,i)=>{

            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.production.toFixed(2)}</td>
                    <td>{item.talent.toFixed(2)}</td>
                    <td>{item.sportswear.toFixed(2)}</td>
                    <td>{item.formalWear.toFixed(2)}</td>
                    <td>{item.qa.toFixed(2)}</td>
                    <td>{item.totalAverage.toFixed(2)}</td>
                    <td>{i+1}</td>
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
                            <th>Candidate No</th>
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
                    {rowsMale}
                    </tbody>
              </table>
              
              <h3> Female </h3>
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Candidate No</th>
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
                    {rowsFemale}
                    </tbody>
              </table>




            </Well>
            
        );
    }
}




function mapStateToProps(state) {

    return {
        finalranking:state.finalranking
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        finalrankingactions: bindActionCreators(finalrankingactions, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Scoreboard);


