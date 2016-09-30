import * as types from '../constants/MovieListingActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let deleteMovie = (id)=>{

    return dispatcher=>{



            axios.delete('/api/movies/'+ id)
                .then(function (response) {
                    dispatcher(routerActions.push("/admin/movieslist"));
                })
                .catch(function (error) {
                    dispatcher(dialogActions.openAlert("Data Failed to be deleted",'Failed','danger'));
                });
        };
};


export let saveData = ()=>{

    return (dispatcher,getState)=>{

        var {selectedMovie} = getState().movielisting;

         if(selectedMovie.id){
             axios.put('/api/movies/'+selectedMovie.id, {
                     movieNo:selectedMovie.movieNo,
                     title: selectedMovie.title
                 }
             )
                 .then(function (response) {
                     dispatcher(routerActions.push("/admin/movieslist"));
                 })
                 .catch(function (error) {
                     dispatcher(dialogActions.openAlert("Data Failed to be Edited",'Failed','danger'));
                 });
         }
        else {
             axios.post('/api/movies', {
                     movieNo:selectedMovie.movieNo,
                     title: selectedMovie.title
                 }
             )
                 .then(function (response) {
                     dispatcher(routerActions.push("/admin/movieslist"));
                 })
                 .catch(function (error) {
                     dispatcher(dialogActions.openAlert("Data Failed to be Added",'Failed','danger'));
                 });
         }


    }

};


export let updateField = (data)=>{

    return {
        type:types.LOAD_MOVIE_UPDATE_FIELD,
        data
    };

};

export let loadMovie = (id)=>{

    return dispatcher=>{

        axios.get('/api/movies/'+id)
            .then(function (response) {
                var data = response.data;

                dispatcher(loadMovieSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};


export let loadMovieSuccess= (movie)=>{

    return {
        type: types.LOAD_MOVIE_SUCCESS,
        movie
    }
};


export let loadMovies = ()=>{


    return dispatcher=>{

        axios.get('/api/movies')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadMoviesSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadMoviesSuccess = (records)=>{

    return {
        type: types.LOAD_MOVIES_SUCCESS,
        records
    }
};