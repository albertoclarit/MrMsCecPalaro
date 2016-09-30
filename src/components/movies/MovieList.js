import React from 'react';
import {Well,
       Table,
       Button
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions  from '../../actions/dialogactions';
import * as movielistingactions  from '../../actions/movielistingactions';
import { routerActions } from 'react-router-redux'

class MovieList extends React.Component{
    constructor (props){
        super(props);
    }
    
    
     componentDidMount(){

          this.props.movielistingactions.loadMovies();
     }
     
      addMovie = ()=>{


         this.props.routerActions.push('/admin/movieslist_add');
     };

     editMovie = (id)=>{

         return ()=>{
             this.props.routerActions.push('/admin/movieslist/'+ id);
         };
     };


    render(){

        var rows = this.props.movielisting.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td>
                         <Button bsSize="small"  bsStyle="warning" onClick={this.editMovie(item.id)}>Edit</Button>
                         </td>
                     <td>{item.movieNo}</td>
                     <td>{item.title}</td>
                </tr>
            );
        });

        return (
            <Well>
            
                <center>
                    <h3>Movie Listings</h3>
                </center>

                <Table striped bordered condensed >
                    <thead>
                    <tr>
                        <th>Options</th>
                        <th>Movie No</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Button bsStyle="primary" onClick={this.addMovie}>Add a Movie </Button>


            </Well>
        );
    }
}

function mapStateToProps(state) {

    return {
    movielisting:state.movielisting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        routerActions: bindActionCreators(routerActions, dispatch),
        movielistingactions: bindActionCreators(movielistingactions, dispatch),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MovieList);


