/**
 * Created by albertoclarit on 9/17/16.
 */
import React from 'react';
import {FormControl} from 'react-bootstrap';


export default  class ScoreCombo extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){


        var options=[];
         var val = 1.0;
          var i=0;
        while(val <= 10){

            options.push(
                (<option key={i}
                         value={val.toFixed(1)}
                    >
                    {val.toFixed(1)}
                    </option>));
            val +=0.1;
            i++;
        }

        return(
            <FormControl
                style={{
                 width:'200px'
                }}
                componentClass="select"
                placeholder="select"
                {...this.props}
                >
                {options}
            </FormControl>
        );
    }
}