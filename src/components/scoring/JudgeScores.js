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

    const columns = [{
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
      title: 'Talent',
      dataIndex: 'talent',
      sorter: (a, b) => a.talent - b.talent,
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

    const data = [{
      key: '1',
      candidateno: 1,
      name: 'John Brown',
      age: 32,
      production: 1,
      talent: 2,
      swimsuit: 3,
      gown: 4,
      interview: 5
    }, {
      key: '2',
      candidateno: 2,
      name: 'Jim Green',
      age: 42,
      production: 1,
      talent: 2,
      swimsuit: 3,
      gown: 4,
      interview: 5
    }, {
      key: '3',
      candidateno: 3,
      name: 'Joe Black',
      age: 32,
      production: 1,
      talent: 2,
      swimsuit: 3,
      gown: 4,
      interview: 5
    }, {
      key: '4',
      candidateno: 4,
      name: 'Jim Red',
      age: 32,
      production: 1,
      talent: 2,
      swimsuit: 3,
      gown: 4,
      interview: 5
    }];

    return(
      <div>
        <h1> All Scores </h1>
        <Well style={{ margin: '0px 15px' }} >
          <Table columns={columns} dataSource={this.props.femalescoring.allScores} pagination={false} onChange={this.onChange} />
        </Well>
      </div>
    )
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


