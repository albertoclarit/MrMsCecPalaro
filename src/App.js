import React from 'react';
//import ReactDOM from 'react-dom';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup,
        Nav,
        NavItem
} from 'react-bootstrap';

export default class App extends React.Component {
    //eslint-disable-next-line
   constructor(props){
       super(props);
   }


state={
    selectedKey:1
};
    static contextTypes = {
        router: React.PropTypes.object
    };



    handleSelect= (selectedKey)=>{
          this.setState({selectedKey});
          switch (selectedKey) {
              case 1:
                  this.context.router.push("/");
                  break;
              case 2:
                  this.context.router.push("/judges")
                  break;
              case 3:
                  this.context.router.push("/admin")
                  break;
              default:
                  return;

          }


      };


  render(){
      

    return (
        <div className="container">
            <Nav bsStyle="pills" activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
                <NavItem eventKey={1}>Home</NavItem>
                <NavItem eventKey={2}>Judges</NavItem>
                <NavItem eventKey={3}>Admin</NavItem>
            </Nav>
            {this.props.children}
         </div>
    );
  }
}

