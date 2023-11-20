import Movie from './Movie'
import React from 'react'

export default function Body (props) {

    console.log(props.data)

//const [movieData, setMovieData] = React.useState({})




// React.useEffect ( () => {
    
//         props.data?.map( movie => {
        
//             const title = movie.originalTitleText.text;
//             const releaseYear =movie.releaseYear.year;
//             const imageUrl = movie.primaryImage.url;
            
//             setMovieData( () => {
//                 <div>
//                     <Movie 
//                         title={title}
//                         releaseYear={releaseYear}
//                         imageUrl={imageUrl}
//                     />
//                 </div>
//             })
//         })
    
// }, [props.data])
    const movieData = props.data?.map( movie => {
        
        const title = movie.Title;
        const releaseYear =movie.Year;
        const imageUrl = movie.Poster;
        const imdbID = movie.imdbID;
        
        console.log(title)
        console.log(releaseYear)
        console.log(imageUrl)
        return (
            <Movie 
                title={title}
                releaseYear={releaseYear}
                imageUrl={imageUrl}
                imdbID={imdbID}
            />
        )
    })

    

    return (
        <div className="movies">
            {props.data && movieData}
        </div>
    )
}