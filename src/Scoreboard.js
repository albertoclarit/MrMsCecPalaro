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
        ButtonToolbar,
        Tabs,
        Tab} from 'react-bootstrap';
import * as finalrankingactions  from './actions/finalrankingactions';
import * as dialogactions  from './actions/dialogactions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import CoronationResultsGrid from './ResultsGrid/Coronation';
import PrePageantResultsGrid from './ResultsGrid/PrePageant';
import TalentResultsGrid from './ResultsGrid/Talent';



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

    resetScores=()=>{

        this.props.dialogactions.openConfirm('Are you sure you wanted to reset Scores?','Please Confirm','YES','NO',(result)=>{

            if(result){

                this.props.dialogactions.openConfirm('Are you REALLY REALLY REALLY Sure?','Please Confirm','YES','NO',(result1)=>{

                    if(result1){
                        this.props.finalrankingactions.resetscores();
                    }
                });

            }
        });
    };


    render(){

        const wellStyle={
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'
        };

        var rowsFemale = this.props.finalranking.recordsFemale.map((item,i)=>{

            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.production.toFixed(2)}</td>
                    <td>{item.talent.toFixed(2)}</td>
                    <td>{item.swimsuit.toFixed(2)}</td>
                    <td>{item.formalWear.toFixed(2)}</td>
                    <td>{item.qa.toFixed(2)}</td>
                    <td>{item.totalAverage.toFixed(2)}</td>
                    <td>{i+1}</td>
                </tr>
            );
        });


        // Tabs

          var talentTabs = [];
        //
        // <Tab eventKey={2} title="Tab 2">Judge 2</Tab>
      for(var i=0;i<this.props.finalranking.talent.judgeScores.length;i++){

               talentTabs.push(
                   <Tab key={i} eventKey={i+1} title={"Judge #" + this.props.finalranking.talent.judgeScores[i].data.judgeNo}>
                     <TalentResultsGrid judgeNo={i+1} judgeData = {this.props.finalranking.talent.judgeScores[i]}/>
                   </Tab>
               );

           }

           var coronationTabs = [];
         //
         // <Tab eventKey={2} title="Tab 2">Judge 2</Tab>
       for(var i=0;i<this.props.finalranking.coronation.judgeScores.length;i++){

                coronationTabs.push(
                    <Tab key={i} eventKey={i+1} title={"Judge #" + this.props.finalranking.coronation.judgeScores[i].data.judgeNo}>
                      <CoronationResultsGrid judgeNo={i+1} judgeData = {this.props.finalranking.coronation.judgeScores[i]}/>
                    </Tab>
                );

            }

        return (
            <Well style={wellStyle}>

                <center>
                <h2> Final Ranking </h2>
                </center>
                <Button block bsStyle="warning" onClick={this.resetScores}>Reset Scores</Button>
                <br />
                
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Candidate No</th>
                        <th>Candidate Name</th>
                        <th>Production 15%</th>
                        <th>Talent 15%</th>
                        <th>Swimsuit 10%</th>
                        <th>Evening Gown 20%</th>
                        <th>Interview 30%</th>
                        <th>Total 100%</th>
                        <th>Ranking</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rowsFemale}
                    </tbody>
              </table>

                <hr/>
                <hr/>    <hr/>
                
                <br />
                <h4>Talent</h4>
                <Tabs defaultActiveKey={1} id="judgeTabs">
                    {talentTabs}
                </Tabs>

                <br />
                <h4>Coronation</h4>
                <Tabs defaultActiveKey={1} id="judgeTabs">
                    {coronationTabs}
                </Tabs>


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
        dialogactions:bindActionCreators(dialogactions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Scoreboard);
