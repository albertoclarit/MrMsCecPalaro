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
                     <td>{item.prepageant}</td>
                     <td>{item.production}</td>
                     <td>{item.talent}</td>
                     <td>{item.sportswear}</td>
                     <td>{item.formalWear}</td>
                     <td>{item.qa}</td>
                     <td>{item.totalaverage.toFixed(2)}</td>
                     <td>{i+1}</td>
                 </tr>
             );
         });

        var femaleRows = this.props.judgeData.data.femaleResults.map((item,i)=>{
            return (
                <tr key={i} className={i==0 ? "success":null}>
                    <td>{item.candidateNo}</td>
                    <td>{item.name}</td>
                    <td>{item.prepageant}</td>
                    <td>{item.production}</td>
                    <td>{item.talent}</td>
                    <td>{item.sportswear}</td>
                    <td>{item.formalWear}</td>
                    <td>{item.qa}</td>
                    <td>{item.totalaverage.toFixed(2)}</td>
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
                        <th>Pre-Pageant</th>
                        <th>Production</th>
                        <th>Talent</th>
                        <th>Sportswear</th>
                        <th>Formal Wear</th>
                        <th>Wit &amp; Intelligent</th>
                        <th>Average</th>
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
                        <th>Pre-Pageant</th>
                        <th>Production</th>
                        <th>Talent</th>
                        <th>Sportswear</th>
                        <th>Formal Wear</th>
                        <th>Wit &amp; Intelligent</th>
                        <th>Average</th>
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
