import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
import Table from 'antd/lib/table';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import * as femalescoringActions from '../../actions/femalescoringactions'

class JudgeScores extends Component {

  componentWillMount(){
    this.props.femalescoringActions.loadAllScores()
  }

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }

  render(){

    const coronationColumn = [{
      title: 'Number',
      dataIndex: 'candidateNo',
      defaultSortOrder: 'ascend',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.candidateNo - b.candidateNo,
    }, {
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Production',
      dataIndex: 'production',
      sorter: (a, b) => a.production - b.production,
    }, {
      title: 'Swimsuit',
      dataIndex: 'swimsuit',
      sorter: (a, b) => a.swimsuit - b.swimsuit,
    }, {
      title: 'Evening Gown',
      dataIndex: 'formalWear',
      sorter: (a, b) => a.formalWear - b.formalWear,
    }, {
      title: 'Interview',
      dataIndex: 'qa',
      sorter: (a, b) => a.qa - b.qa,
    },];

    const talentColumn = [{
      title: 'Number',
      dataIndex: 'candidateNo',
      defaultSortOrder: 'ascend',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.candidateNo - b.candidateNo,
    }, {
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Talent',
      dataIndex: 'talent',
      sorter: (a, b) => a.talent - b.talent,
    }];

    const finalColumn = [

    ]

    if(this.props.auth.account.event === "Talent"){
      return (
        <div>
         <h1> All Scores </h1>
         <Well style={{ margin: '0px 15px' }} >
           <Table columns={talentColumn} dataSource={this.props.femalescoring.allScores} pagination={false} onChange={this.onChange} />
         </Well>
       </div>
      )
    }else if(this.props.auth.account.event = "Coronation"){
      return (
        <div>
         <h1> All Scores </h1>
         <Well style={{ margin: '0px 15px' }} >
           <Table columns={coronationColumn} dataSource={this.props.femalescoring.allScores} pagination={false} onChange={this.onChange} />
         </Well>
       </div>
      )
    }else{
      return (
        <div>
         <h1> All Scores </h1>
         <Well style={{ margin: '0px 15px' }} >
           <Table columns={finalColumn} dataSource={this.props.femalescoring.allScores} pagination={false} onChange={this.onChange} />
         </Well>
       </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
      auth:state.auth,
      femalescoring: state.femalescoring
  }
}

function mapDispatchToProps(dispatch) {
  return {
      routerActions: bindActionCreators(routerActions, dispatch),
      femalescoringActions: bindActionCreators(femalescoringActions,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(JudgeScores);


