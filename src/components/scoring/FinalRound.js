import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

export default class FinalRound extends Component {

  render(){
    return (
      <div>
        <h1 style={{ textAlign: 'center' }} > Final Round </h1>
        <Button bsSize="small"  bsStyle="success" >Start Final Round</Button>
        <br />

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
            <tr>
              <td>1</td>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
            <tr class="info">
              <td>3</td>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
          </tbody>
        </table> 
                         
      </div>
    )
  }
}