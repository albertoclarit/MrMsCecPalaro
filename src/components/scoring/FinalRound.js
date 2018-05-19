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
          <Tab key={i} eventKey={i+1} title={"Judge #" + this.props.finalround.judgeScores[i].data.judgeNo}>
            <TalentResultsGrid judgeNo={i+1} data={this.props.finalround.judgeScores[i].data}/>
          </Tab>
      );

    }

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