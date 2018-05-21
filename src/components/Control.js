import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import * as controlActions from '../actions/controlactions'

//antd
import List from 'antd/lib/list';
import Switch from 'antd/lib/switch'
import Card from 'antd/lib/card'

class Control extends Component {
  constructor(){
    super()
    this.state={
      tabKey:'Talent'
    }
  }

  componentWillMount(){
    //get all needed data
    this.props.controlActions.getAdminControls()
    this.props.controlActions.getTalentControls()
  }

  componentDidMount(){
    this.interval = setInterval(()=>{
      this.props.controlActions.getTalentControls()
    },2500 ); // every 1.5 seconds refresh
  }

  componentWillUnmount(){
    if( this.interval)
      clearInterval( this.interval);
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
    if(key === "Talent"){
      if( this.interval)
        clearInterval( this.interval);
      this.props.controlActions.getTalentControls()
      this.interval = setInterval(()=>{
        this.props.controlActions.getTalentControls()
      },2500 ); // every 1.5 seconds refresh
    }else if(key === "Production"){
      if( this.interval)
        clearInterval( this.interval);
      this.props.controlActions.getProductionControls()
      this.interval = setInterval(()=>{
        this.props.controlActions.getProductionControls()
      },2500 ); // every 1.5 seconds refresh
    }else if(key === "Coronation"){
      if( this.interval)
        clearInterval( this.interval);
      this.props.controlActions.getCoronationControls()
      this.interval = setInterval(()=>{
        this.props.controlActions.getCoronationControls()
      },2500 ); // every 1.5 seconds refresh
    }else if(key === "FinalRound"){
      if( this.interval)
        clearInterval( this.interval);
      this.props.controlActions.getFinalControls()
      this.interval = setInterval(()=>{
        this.props.controlActions.getCoronationControls()
      },2500 ); // every 1.5 seconds refresh
    }
  }

  adminSwitchChange = (category) =>{
    this.props.controlActions.activateAdmin(category)
  }

  judgeSwitchChange = (category,judgeNo) =>{
    this.props.controlActions.activeJudge(category,judgeNo,this.state.tabKey)
  }

  
  render(){

    const tabList = [{
      key: 'Talent',
      tab: 'Talent',
    }, {
      key: 'Production',
      tab: 'Production',
    }, {
      key: 'Coronation',
      tab: 'Coronation',
    }, {
      key: 'FinalRound',
      tab: 'Final Round',
    },];

    let talentContents = []
    let talent = this.props.control.talent
    for(var a=0;a<talent.length;a++){

      const judge = talent[a];

      talentContents.push(
        <List.Item key={judge.judgeNo} >
          <b>{"Judge #"+judge.judgeNo}</b>
        </List.Item>
      )
      for(var b=0;b<talent[a].categories.length;b++){
        const categories = talent[a].categories[b]
        talentContents.push(
          <List.Item 
            key={b + " " + judge.judgeNo }
            actions={[<Switch 
              checked={categories.status === "PENDING" ? false : true} 
              checkedChildren={categories.status}
              unCheckedChildren={categories.status}
              onChange={()=>this.judgeSwitchChange(categories.name,judge.judgeNo)}
            />]} 
          >
            <List.Item.Meta
              title={categories.category}
            />
          </List.Item>
        )
      }
    }

    let productionContents = []
    let production = this.props.control.production
    for(var a=0;a<production.length;a++){

      const judge = production[a];
      productionContents.push(
        <List.Item key={judge.judgeNo} >
          <b>{"Judge #"+judge.judgeNo}</b>
        </List.Item>
      )
      for(var b=0;b<production[a].categories.length;b++){
        const categories = production[a].categories[b]
        productionContents.push(
          <List.Item 
            key={b + " " + judge.judgeNo }
            actions={[<Switch 
              checked={categories.status === "PENDING" ? false : true} 
              checkedChildren={categories.status}
              unCheckedChildren={categories.status}
              onChange={()=>this.judgeSwitchChange(categories.name,judge.judgeNo)}
            />]} 
          >
            <List.Item.Meta
              title={categories.category}
            />
          </List.Item>
        )
      }
    }

    let coronationContents = []
    let coronation = this.props.control.coronation
    for(var a=0;a<coronation.length;a++){

      let judge = coronation[a];
      coronationContents.push(
        <List.Item key={judge.judgeNo} >
          <b>{"Judge #"+judge.judgeNo}</b>
        </List.Item>
      )
      for(var b=0;b<coronation[a].categories.length;b++){
        const categories = coronation[a].categories[b]
        coronationContents.push(
          <List.Item 
            key={b + " " + judge.judgeNo }
            actions={[<Switch 
              checked={categories.status === "PENDING" ? false : true} 
              checkedChildren={categories.status}
              unCheckedChildren={categories.status}
              onChange={()=>this.judgeSwitchChange(categories.name,judge.judgeNo)}
            />]} 
          >
            <List.Item.Meta
              title={categories.category}
            />
          </List.Item>
        )
      }
    }

    let finalContents = []
    let final = this.props.control.final
    for(var a=0;a<final.length;a++){

      const judge = final[a];
      
      finalContents.push(
        <List.Item key={"final "+judge.judgeNo} >
          <b>{"Judge #"+judge.judgeNo}</b>
        </List.Item>
      )
      for(var b=0;b<final[a].categories.length;b++){
        const categories = final[a].categories[b]
        finalContents.push(
          <List.Item 
            key={b + " final " + judge.judgeNo }
            actions={[<Switch 
              checked={categories.status === "PENDING" ? false : true} 
              checkedChildren={categories.status}
              unCheckedChildren={categories.status}
              onChange={()=>this.judgeSwitchChange(categories.name,judge.judgeNo)}
            />]} 
          >
            <List.Item.Meta
              title={categories.category}
            />
          </List.Item>
        )
      }
    }
    
    const tabContents={
      Talent: (
        <List 
          bordered
          size="small"
        >
        {talentContents}
      </List>),
      Coronation: (
        <List 
          bordered
          size="small"
        >
        {coronationContents}
        </List>),
      Production: (
        <List 
          bordered
          size="small"
        >
        {productionContents}
        </List>),
      FinalRound: (
        <List 
          bordered
          size="small"
        >
        {finalContents}
        </List>),
    }

    return (
      <div>
        <h1 style={{ textAlign: "center" }} > Control Panel </h1>
        <br />
        <br />

        <Row className="show-grid" >
          <Col md={6} sm={6} xs={6} >
            <Card 
              title="Admin"
            >
              <List
                bordered
                size="small"
                itemLayout="horizontal"
                dataSource={this.props.control.admin}
                renderItem={(item,index) =>(
                  <List.Item 
                    key={item.category}
                    actions={[<Switch 
                      checked={item.status === "ACTIVE" ? true : false} 
                      checkedChildren={item.status}
                      unCheckedChildren={item.status}
                      onChange={()=>this.adminSwitchChange(item.name)}
                    />]} 
                  >
                    <List.Item.Meta
                      title={item.category}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col md={6} sm={6} sm={6} >
            <Card
              tabList={tabList}
              activeTabKey={this.state.tabKey}
              onTabChange={(key) => { this.onTabChange(key, 'tabKey'); }}
            >
              {tabContents[this.state.tabKey]}
            </Card>
          </Col>
        </Row>


        
          
          

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    control: state.control
  }
}

function mapDispatchToProps(dispatch) {
  return {
    controlActions: bindActionCreators(controlActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Control)