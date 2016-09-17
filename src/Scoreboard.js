/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well,
        FormGroup,
        FormControl,
        ControlLabel,
        HelpBlock,
        Button,
        ButtonGroup,
        ButtonToolbar} from 'react-bootstrap';
import * as candidatelistingactions  from './actions/candidatelistingactions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';



class Scoreboard extends React.Component {

    constructor(props){
        super(props);
    }


    render(){
        
        const wellStyle={
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        
        
         var rows = this.props.candidatelisting.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>{item.candidateNo}</td>
                </tr>
            );
        });
        
        return (
            <Well style={wellStyle}>
            
                <center>
<<<<<<< HEAD
                <h2> Final Ranking </h2>
                </center>
                <h3> Male </h3>
=======
                <h2> Final Rating </h2>
                </center>
            
                <p>Male</p>
            
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>Candidate #</th>
                            <th>Talent</th>
                            <th>Production</th>
                            <th>Sportswear</th>
                            <th>Formalwear</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
              </table> 
              
              <p>Female</p>
            
>>>>>>> acf3cba03722702f8c2e75389de5d8a0732c9f57
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>Candidate #</th>
<<<<<<< HEAD
                            <th>Production Number</th>
                            <th>Talent</th>
                            <th>Gown</th>
                            <th>Sportswear</th>
                            <th>Wit & Intelligent</th>
                            <th>Final Average</th>
                        </tr>
                        <tr>
                            <th>1</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>2</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>3</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>4</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>5</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
              </table>
              
              <h3> Female </h3>
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>Candidate #</th>
                            <th>Production Number</th>
                            <th>Talent</th>
                            <th>Gown</th>
                            <th>Sportswear</th>
                            <th>Wit & Intelligent</th>
                            <th>Final Average</th>
                        </tr>
                        <tr>
                            <th>1</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>2</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>3</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>4</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>5</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
              </table> 
              <h3> Judges </h3>
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button bsSize="large">1</Button>
                    <Button bsSize="large">2</Button>
                    <Button bsSize="large">3</Button>
                    <Button bsSize="large">4</Button>
                    <Button bsSize="large">5</Button>
                   </ButtonGroup>
                </ButtonToolbar>
       
              <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>Candidate #</th>
                            <th>Production Number</th>
                            <th>Talent</th>
                            <th>Gown</th>
                            <th>Sportswear</th>
                            <th>Wit & Intelligent</th>
                            <th>Final Average</th>
                        </tr>
                        <tr>
                            <th>1</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>2</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>3</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>4</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>5</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
=======
                            <th>Talent</th>
                            <th>Production</th>
                            <th>Sportswear</th>
                            <th>Formalwear</th>
                            <th>Total</th>
>>>>>>> acf3cba03722702f8c2e75389de5d8a0732c9f57
                        </tr>
                        
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
              </table> 
            </Well>
            
        );
    }
}




function mapStateToProps(state) {

    return {
    candidatelisting:state.candidatelisting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        candidatelistingactions: bindActionCreators(candidatelistingactions, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Scoreboard);


