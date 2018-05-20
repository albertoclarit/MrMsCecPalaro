import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as controlActions from '../actions/controlactions';

//antd
import List from 'antd/lib/list';
import Switch from 'antd/lib/switch'
import Card from 'antd/lib/card'

class JudgeConfirm extends Component {

  componentWillMount(){
    this.props.controlActions.perJudgeControls(this.props.auth.account.judgeNo)
  }

  judgeSwitchChange = (category,judgeNo) =>{
    this.props.controlActions.perJudgeActivate(category,judgeNo)
  }

  componentDidMount(){
    this.interval = setInterval(()=>{

        this.props.controlActions.perJudgeControls(this.props.auth.account.judgeNo)
    },1500); // every 1.5 seconds refresh
  }

  componentWillUnmount(){
    if( this.interval)
        clearInterval( this.interval);
  }

  render(){
    let {perjudge} = this.props.control


    var list = []

    if(this.props.auth.account.event === "Talent"){
      list = perjudge.talent
    }else if(this.props.auth.account.event === "Production"){
      list = perjudge.production
    }else if(this.props.auth.account.event === "Coronation"){
      list = perjudge.coronation
    }else if(this.props.auth.account.event === "FinalRound"){
      list = perjudge.final
    }

    return (
      <div>
        <h3>Confirm </h3>
        <Card >
          <List
            key={"judge confirmation"}
            bordered
            size="small"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item,index) =>(
              <List.Item 
                key={item.name}
                actions={[<Switch 
                  disabled={item.status === "PENDING" ? false : true}
                  checked={item.status === "PENDING" ? false : true} 
                  checkedChildren={item.status}
                  unCheckedChildren={item.status}
                  onChange={()=>this.judgeSwitchChange(item.name,this.props.auth.account.judgeNo)}
                />]} 
              >
                <List.Item.Meta
                  title={item.category}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    control: state.control
  }
}

function mapDispatchToProps(dispatch){
  return {
    controlActions: bindActionCreators(controlActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(JudgeConfirm)