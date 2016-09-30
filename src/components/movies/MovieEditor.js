/**
 * Created by albertoclarit on 8/15/16.
 */
import React from 'react';
import {
    Well,
    Table,
    Button
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from '../../actions/dialogactions';
import * as movielistingactions  from '../../actions/movielistingactions';
import { routerActions } from 'react-router-redux'

import MovieForm from './MovieForm'

class MovieEditor extends React.Component {

    constructor(props) {
        super(props);

    }

    back = ()=>{
        this.props.routerActions.push("/movieslist")

    };

    componentDidMount=()=>{

        if(this.props.params.id)
          this.props.movielistingactions.loadMovie(this.props.params.id);

    };

    render(){

        return (
            <Well>
                <h4>{this.props.params.id ? 'Edit':'Add'} a Movie </h4>

                <MovieForm selectedMovie={this.props.selectedMovie}
                           movielistingactions={this.props.movielistingactions}
                           dialogActions={this.props.dialogActions}/>
                <Button bsStyle="primary" onClick={this.back}>Back to List</Button>
            </Well>
        );
    }

}

function mapStateToProps(state) {

    return {
     selectedMovie:state.movielisting.selectedMovie
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
        movielistingactions: bindActionCreators(movielistingactions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MovieEditor);
