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


    static contextTypes = {
        router: React.PropTypes.object
    };



    handleSelect= (selectedKey)=>{

          switch (selectedKey) {
              case 1:
                  this.context.router.push("/");
                  break;
              case 2:
                  this.context.router.push("/logIn")
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
            <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
                <NavItem eventKey={1}>Home</NavItem>
                <NavItem eventKey={2}>Log-In</NavItem>
            </Nav>
            {this.props.children}
         </div>
    );
  }
}

