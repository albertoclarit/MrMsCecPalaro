/**
 * Created by albertoclarit on 8/15/16.
 */
import React from 'react';
import {Well,
       Table} from 'react-bootstrap';


export default class JudgeList extends React.Component {

    constructor(props) {
        super(props);

    }

    render(){

        return (
            <Well>
                 <h4>Judge Listings</h4>

                <Table striped bordered condensed >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Judge No</th>
                        <th>Password</th>
                    </tr>
                    </thead>
                </Table>


            </Well>
        );
    }
}
