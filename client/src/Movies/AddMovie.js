import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title:"",
    director:"",
    metascore:"",
    stars:[""]
}

const AddMovie =props =>{
    const { push } = useHistory()
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams()

    const handleChange = event =>{
        let value = event.target.value;
        if( event.target.name === "metascore") {
            value = parseInt(value, 10)
        }
        if( event.target.name === "stars") {
            value = value.split(",")
        }

        setMovie({
            ...movie,
            [event.target.name]: value
        })
    }

    const addMoreStars = () =>{

    }

    const handleSubmit = event =>{
        event.preventDefault()
        axios
            .post(`http://localhost:5000/api/movies/`, movie)
            .then(res =>{
                // console.log(res.data)
                setMovie(initialMovie)
                props.setMovieList(res.data)
                push(`/`)
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
                <label>Actors:<button onClick={addMoreStars}>+</button>
                    <input 
                            name="stars"
                            value={movie.stars}
                            type="text"
                            placeholder="Actor"
                            onChange={handleChange}
                    />
                </label>
                
                <button className="update-form-button">Add</button>
            </form>
        </div>
    )
}

export default AddMovie;