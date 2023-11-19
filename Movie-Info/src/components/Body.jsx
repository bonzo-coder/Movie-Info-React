import Movie from './Movie'
import React from 'react'

export default function Body (props) {

console.log(props)

const [movieData, setMovieData] = React.useState({})




React.useEffect ( () => {
    setMovieData( () => {
        props.data.map( movie => console.log(movie))
    })
}, [props.data])


    

    return (
        <div className="movies">
            {props.data && movieData}
        </div>
    )
}