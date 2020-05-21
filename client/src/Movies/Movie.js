import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList, savedList, setSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    if(!savedList.includes(movie)){
      addToSavedList(movie)
    }
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const updateMovie = () =>{
    push(`/update-movie/${params.id}`)
  }
  
  const deleteMovie = () =>{
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res =>{
        // console.log(res.data)
        const newMovieList = movieList.filter( movie => 
          movie.id !== res.data )
        setMovieList(newMovieList)
        const newSavedList = savedList.filter( movie =>
          movie.id !== res.data )
        setSavedList(newSavedList)
        push(`/`)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={updateMovie}>
        Update
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
