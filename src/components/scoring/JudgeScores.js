import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
import Table from 'antd/lib/table';
import Avatar from 'antd/lib/avatar'
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import * as femalescoringActions from '../../actions/femalescoringactions'

import pic1 from '../../../images/Female/1.jpg'
import pic2 from '../../../images/Female/2.jpg'
import pic3 from '../../../images/Female/3.jpg'
import pic4 from '../../../images/Female/4.jpg'
import pic5 from '../../../images/Female/5.jpg'
import pic6 from '../../../images/Female/6.jpg'
import pic7 from '../../../images/Female/7.jpg'
import pic8 from '../../../images/Female/8.jpg'
import pic9 from '../../../images/Female/9.jpg'
import pic10 from '../../../images/Female/10.jpg'
import pic11 from '../../../images/Female/11.jpg'
import pic12 from '../../../images/Female/12.jpg'
import pic13 from '../../../images/Female/13.jpg'
import pic14 from '../../../images/Female/14.jpg'
import pic15 from '../../../images/Female/15.jpg'
import pic16 from '../../../images/Female/16.jpg'
import pic17 from '../../../images/Female/17.jpg'
import pic18 from '../../../images/Female/18.jpg'

class JudgeScores extends Component {
  constructor(){
    super()
    this.state={
      pic_reference:[]
    }
  }

  componentWillMount(){
    this.props.femalescoringActions.loadAllScores()

    var pics = [];
        pics.push(pic1);
        pics.push(pic2);
        pics.push(pic3);
        pics.push(pic4);
        pics.push(pic5);
        pics.push(pic6);
        pics.push(pic7);
        pics.push(pic8);
        pics.push(pic9);
        pics.push(pic10);
        pics.push(pic11);
        pics.push(pic12);
        pics.push(pic13);
        pics.push(pic14);
        pics.push(pic15);
        pics.push(pic16);
        pics.push(pic17);
        pics.push(pic18);



        this.setState({
            pic_reference:pics
        })
  }

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }

  render(){

    const coronationColumn = [{
      title: 'Name',
      dataIndex: 'name',
      render:(text,record,index) => {
        // console.log(record)
        return (
          <div>
            <Avatar 
              size="large"
              src={this.state.pic_reference[record.avatar]}
              style={{
                marginRight: 10
              }}
            />
            {text}
          </div>
        )
      }
    }, {
      title: 'Number',
      dataIndex: 'candidateNo',
      defaultSortOrder: 'ascend',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.candidateNo - b.candidateNo,
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
    
    const productionColumn = [{
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
    }];

    const finalColumn = [

    ]

    const event = this.props.auth.account.event;
    let column = []
    if(event === "Talent")
      column = talentColumn
    else if(event === "Coronation")
      column = coronationColumn
    else if(event === "Production")
      column = productionColumn

    return(
      <div>
        <h2 style={{ textAlign: 'center'}} > All Scores </h2>
        <Well>
          <Table 
            columns={column} 
            dataSource={this.props.femalescoring.allScores} 
            pagination={false} 
            onChange={this.onChange} 
          />
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


