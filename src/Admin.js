/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well,Nav,NavItem} from 'react-bootstrap';


export default class Admin extends React.Component {

    constructor(props){
        super(props);
    }
    
    
    static contextTypes = {
        router: React.PropTypes.object
    };



    handleSelect= (selectedKey)=>{

          switch (selectedKey) {
              case 1:
                  this.context.router.push("/")
                  break;
              case 2:
                  this.context.router.push("/talent")
                  break;
              case 3:
                  this.context.router.push("/gown")
                  break;
              case 4:
                  this.context.router.push("/sportswear")
                  break;   
              case 5:
                  this.context.router.push("/witandint")
                  break;
              case 6:
                  this.context.router.push("/scoreboard")
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
                <NavItem eventKey={2}>Best in Talent</NavItem>
                <NavItem eventKey={3}>Best in Gown</NavItem>
                <NavItem eventKey={4}>Best is Sportswear</NavItem>
                <NavItem eventKey={5}>Wit and Intelligent</NavItem>
                <NavItem eventKey={6}>Score Board</NavItem>
                <NavItem eventKey={7}>Log out</NavItem>
            </Nav>
            {this.props.children}
         </div>
        );
    }
}

