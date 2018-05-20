/**
 * Created by albertoclarit on 9/21/16.
 */
import React from 'react';
import {Table} from 'react-bootstrap';

export default  class Coronation extends React.Component {


    render(){
      // console.log(this.props.data);

        var femaleRows = this.props.data.map((item,i)=>{
            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.interview}</td>
                    <td>{item.poise}</td>
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
                        <th>Interview 50%</th>
                        <th>Poise &amp; 50%</th>
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
