import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title:"",
    director:"",
    metascore:"",
    stars:[]
}

const UpdateMovie =props =>{
    const { push } = useHistory()
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams()

    useEffect(()=>{
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res=>{
                // console.log(res.data)
                setMovie(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[id])
    
    const handleChange = event =>{
        let value = event.target.value;
        if( event.target.name === "metascore") {
            value = parseInt(value, 10)
        }
        if( event.target.name === "stars") {
            value = value.split(",")
        }
        // console.log(event.target.name)
        // console.log(event.target.value)
        setMovie({
            ...movie,
            [event.target.name]: value
        })
    }

    const handleSubmit = event =>{
        event.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res =>{
                console.log(res)
                setMovie(initialMovie)
                const newMovieList = props.movieList.map( movie =>{
                    if(movie.id === res.data.id){
                        return res.data
                    }
                    return movie
                })
                props.setMovieList(newMovieList)
                const newSavedList = props.savedList.map( movie =>{
                    if(movie.id === res.data.id){
                        return res.data
                    }
                    return movie
                })
                props.setSavedList(newSavedList)
                push(`/movies/${id}`)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
        <div>
            <form className="update-form" on onSubmit={handleSubmit}>
                <label>Title:&nbsp;
                    <input
                        name="title"
                        value={movie.title}
                        type="text"
                        placeholder="Title"
                        onChange={handleChange}
                    />
                </label>
                <label>Director:&nbsp;
                    <input 
                        name="director"
                        value={movie.director}
                        type="text"
                        placeholder="Director"
                        onChange={handleChange}
                    />
                </label>
                <label>Metascore:&nbsp;
                    <input 
                        name="metascore"
                        value={movie.metascore}
                        type="text"
                        placeholder="Metascore"
                        onChange={handleChange}
                    />
                </label>
                {/* {!movie.stars && (
                    <label>Actor:&nbsp;
                        <input 
                            name="stars"
                            value={movie.stars[0]}
                            type="text"
                            placeholder="Actor"
                            onChange={handleChange}
                        />
                    </label>
                )}
                {movie.stars && (
                    movie.stars.map( (star,index) =>{
                        return(
                            <label key={index}>Actor{index}:&nbsp;
                                <input 
                                    name="stars"
                                    value={movie.stars[index]}
                                    type="text"
                                    placeholder="Actor"
                                    onChange={handleChange}
                                />
                            </label>
                        )
                    })
                )} */}
                <label>Actors:&nbsp;
                        <input 
                            name="stars"
                            value={movie.stars}
                            type="text"
                            placeholder="Actors"
                            onChange={handleChange}
                        />
                </label>
                <button className="update-form-button"> Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;