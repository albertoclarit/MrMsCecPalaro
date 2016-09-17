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
            width: 'auto',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'
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

