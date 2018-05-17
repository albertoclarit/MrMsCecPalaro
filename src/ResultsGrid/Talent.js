/**
 * Created by albertoclarit on 9/21/16.
 */
import React from 'react';
import {Table} from 'react-bootstrap';

export default  class Talent extends React.Component {


    render(){

        //  var maleRows = this.props.judgeData.data.maleResults.map((item,i)=>{

        //      return (
        //          <tr key={i} className={i==0 ? "success":null}>
        //              <td>{item.candidateNo}</td>
        //              <td>{item.name}</td>
        //              <td>{item.talent}</td>
        //              <td>{item.totalaverage.toFixed(2)}</td>
        //              <td>{i+1}</td>
        //          </tr>
        //      );
        //  });

        var femaleRows = this.props.judgeData.data.femaleResults.map((item,i)=>{
            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.talent}</td>
                    <td>{item.totalaverage.toFixed(2)}</td>
                    <td>{i+1}</td>
                </tr>
            );
        });


        return (
            <div>

                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Candidate No</th>
                        <th>Candidate Name</th>
                        <th>Talent 15%</th>
                        <th>Total</th>
                        <th>Ranking</th>
                    </tr>
                    </thead>
                    <tbody>
                    {femaleRows}
                    </tbody>
                </table>

            </div>
        );
    }

}
