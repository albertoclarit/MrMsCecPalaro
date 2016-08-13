/**
 * Created by albertoclarit on 8/13/16.
 */
import React from 'react';
import {Well} from 'react-bootstrap';


export default class Welcome extends React.Component {

    constructor(props){
        super(props);
    }


    render(){
        
          const wellStyle={
            width: 400,
            height: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 80,
        }
          const fontSize={
            fontSize: 50,  
          }
        
        return (
            <Well style={wellStyle} >
                <center style={fontSize}>Welcome</center> 
            </Well>
        );
    }
}

