/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well
        } from 'react-bootstrap';


export default class Talent extends React.Component {

    constructor(props){
        super(props);
    }
    State={
        selectedKey:1
    };
    
    render(){
        
        const wellStyle={
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        
        return (
            <Well style={wellStyle}>
            
                <center>
                <h2> Talent</h2>
                </center>
            
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                        <th>Candidate #</th>
                        <th>Judge 1</th>
                        <th>Judge 2</th>
                        <th>Judge 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>85</td>
                        <td>86</td>
                        <td>87</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>82</td>
                        <td>85</td>
                        <td>80</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>87</td>
                        <td>84</td>
                        <td>86</td>
                        </tr>
                        <tr>
                        <td>4</td>
                        <td>85</td>
                        <td>87</td>
                        <td>87</td>
                        </tr>
                        <tr>
                        <td>5</td>
                        <td>87</td>
                        <td>88</td>
                        <td>84</td>
                        </tr>
                        <tr>
                        <td>6</td>
                        <td>85</td>
                        <td>86</td>
                        <td>87</td>
                        </tr>
                        <tr>
                        <td>7</td>
                        <td>87</td>
                        <td>87</td>
                        <td>86</td>
                        </tr>
                    </tbody>
              </table> 
            </Well>
            
        );
    }
}

