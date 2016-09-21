/**
 * Created by albertoclarit on 9/21/16.
 */
import React from 'react';
import {Table} from 'react-bootstrap';

export default  class ResultsGrid extends React.Component {


    render(){
        
         var maleRows = this.props.judgeData.data.maleResults.map((item,i)=>{

             return (
                 <tr key={i} className={i==0 ? "success":null}>
                     <td>{item.candidateNo}</td>
                     <td>{item.name}</td>
                     <td>{item.production}</td>
                     <td>{item.talent}</td>
                     <td>{item.name}</td>
                     <td>{item.sportswear}</td>
                     <td>{item.formalWear}</td>
                     <td>{item.qa}</td>
                     <td>{i+1}</td>
                 </tr>
             );
         });

        var femaleRows = this.props.judgeData.data.femaleResults.map((item,i)=>{
            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.production}</td>
                    <td>{item.talent}</td>
                    <td>{item.name}</td>
                    <td>{item.sportswear}</td>
                    <td>{item.formalWear}</td>
                    <td>{item.qa}</td>
                    <td>{i+1}</td>
                </tr>
            );
        });


        return (
            <div>
                <h5> Male </h5>


                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Candidate No</th>
                        <th>Candidate Name</th>
                        <th>Production 15%</th>
                        <th>Talent 15%</th>
                        <th>Sportswear 10%</th>
                        <th>Formal Wear 20%</th>
                        <th>Wit &amp; Intelligent 40%</th>
                        <th>Total 100%</th>
                        <th>Ranking</th>
                    </tr>

                    </thead>
                    <tbody>
                    {maleRows}
                    </tbody>
                </table>

                <h5> Female </h5>
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Candidate No</th>
                        <th>Candidate Name</th>
                        <th>Production 15%</th>
                        <th>Talent 15%</th>
                        <th>Sportswear 10%</th>
                        <th>Formal Wear 20%</th>
                        <th>Wit &amp; Intelligent 40%</th>
                        <th>Total 100%</th>
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