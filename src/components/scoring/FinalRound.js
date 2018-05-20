import React, { Component } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import Alert from 'antd/lib/alert'
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as finalroundActions from '../../actions/finalroundactions'
import * as dialogActions from '../../actions/dialogactions';
import TalentResultsGrid from '../../ResultsGrid/FinalRound';

class FinalRound extends Component {

  componentWillMount(){
    this.props.finalroundActions.checkStatus()
  }

  startFinalRound = () =>{
    this.props.finalroundActions.startFinalRound()
  }

  resetScores=()=>{

      this.props.dialogActions.openConfirm('Are you sure you wanted to reset Scores?','Please Confirm','YES','NO',(result)=>{

          if(result){

              this.props.dialogActions.openConfirm('Are you REALLY REALLY REALLY Sure?','Please Confirm','YES','NO',(result1)=>{

                  if(result1){
                      this.props.finalroundActions.resetFinalroundScore();
                  }
              });

          }
      });
  };

  componentDidMount(){

      this.interval = setInterval(()=>{
  
          this.props.finalroundActions.checkStatus();
          this.props.finalroundActions.getInterviewScores()
          this.props.finalroundActions.getPoiseScores()
      },1500); // every 1.5 seconds refresh

  }

  componentWillUnmount(){

    if( this.interval)
        clearInterval( this.interval);
  }

  render(){

    const rows = this.props.finalround.records.map((item,i)=>{
      return (
        <tr key={i} className={i==0 ? "success":null} >
          <td>{item.candidateNo}</td>
          <td>{item.name}</td>
          <td>{item.interview.toFixed(2)}</td>
          <td>{item.poise.toFixed(2)}</td>
          <td>{item.totalAverage.toFixed(2)}</td>
          <td>{i+1}</td>
        </tr>
      )
    })

    var tabs = [];
  
    for(var i=0;i<this.props.finalround.judgeScores.length;i++){
      tabs.push(
          <Tab key={i} eventKey={i+1} title={"Judge #" + this.props.finalround.judgeScores[i].judgeNo}>
            <TalentResultsGrid judgeNo={i+1} data={this.props.finalround.judgeScores[i].result}/>
          </Tab>
      );

    }

    //interview scores

    var interviewtotalJudgeTd = [];

        if(this.props.finalround.interview.length>0){

            var countJudge = this.props.finalround.interview[0].judgeTotal;

            for(var i=0;i<countJudge;i++)
            interviewtotalJudgeTd.push(<th key={i}>Judge #{i+1}</th>);
        }

        var interviewrows = this.props.finalround.interview.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judgeNo'+(x+1)].interview)}</td>)
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

    //poise and charm scores

    var poisetotalJudgeTd = [];

        if(this.props.finalround.poise.length>0){

            var countJudge = this.props.finalround.poise[0].judgeTotal;

            for(var i=0;i<countJudge;i++)
            poisetotalJudgeTd.push(<th key={i}>Judge #{i+1}</th>);
        }

        var poiserows = this.props.finalround.poise.map((item,i)=>{

            var othertds = [];

            var noOfJudge = item.judgeTotal;

            for(var x=0;x<noOfJudge;x++){
                othertds.push(<td key={x}>{(item['judgeNo'+(x+1)].poise)}</td>)
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
      <div>
        <h1 style={{ textAlign: 'center' }} > Final Round </h1>

        {
          this.props.finalround.isStarted ?
          null :
          <div>
            <Button block onClick={this.startFinalRound} bsSize="small"  bsStyle="success" disabled={this.props.finalround.isStarted} >Start Final Round</Button>
            <br />
          </div>
        }
        
        {
          this.props.finalround.isStarted ?
          (
            <div>
              <br />
              <Button onClick={this.resetScores} block bsSize="small"  bsStyle="warning" >Reset Final Round</Button>
              <table className="table table-striped table-hover ">
                <thead>
                  <tr>
                    <th>Candidate No</th>
                    <th>Candidate Name</th>
                    <th>Interview 50%</th>
                    <th>Poise and Charm 50%</th>
                    <th>Total 100%</th>
                    <th>Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </table> 

              <h4> Inverview Scores </h4>

              <table className="table table-striped table-hover ">
                <thead>
                    <tr>
                    <th>Candidate No</th>
                    <th>Candidate Name</th>
                        {interviewtotalJudgeTd}
                    <th>Average</th>
                    <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewrows}
                </tbody>
              </table>

              <h4> Poise and Chard </h4>

              <table className="table table-striped table-hover ">
                <thead>
                    <tr>
                    <th>Candidate No</th>
                    <th>Candidate Name</th>
                        {interviewtotalJudgeTd}
                    <th>Average</th>
                    <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewrows}
                </tbody>
              </table>

              <br />
              <h4>Per Judge Score</h4>
              <Tabs defaultActiveKey={1} id="judgeTabs">
                  {tabs}
              </Tabs>
            </div>
          )
          : 
          (
            <Alert
              message="Error"
              description="Final Round has not started yet."
              type="error"
              showIcon
            />
          )
        }
        <br />
        <br />


                         
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    finalround: state.finalround
  }
}

function mapDispatchToProps(dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    finalroundActions: bindActionCreators(finalroundActions, dispatch),
    dialogActions: bindActionCreators(dialogActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FinalRound)