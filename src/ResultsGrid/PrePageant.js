/**
 * Created by albertoclarit on 9/21/16.
 */
import React from 'react';
import {Table} from 'react-bootstrap';

export default  class PrePageant extends React.Component {


    render(){

        var femaleRows = this.props.judgeData.data.femaleResults.map((item,i)=>{
            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.production}</td>
                    <td>{item.totalaverage.toFixed(2)}</td>
                    <td>{i+1}</td>
                </tr>
            );
        });


        return (
            <div>

                <h5> Female </h5>
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Candidate No</th>
                        <th>Candidate Name</th>
                        <th>Production 10%</th>
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
