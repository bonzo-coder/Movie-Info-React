import Movie from "../components/Movie";

export default function movieDataProcess (props, ref) {
    console.log(props)
    const movieData = props.data?.map( movie => {
        const title = movie.title;
        const releaseYear =movie.release_date?.slice(0,4);
        const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        //const imdbID = movie.imdbID;
        const movieId = movie.id;
        const overview = movie.overview;
        const reviewMark = movie.vote_average;
        const index = movie.index;
        if( imageUrl == "https://image.tmdb.org/t/p/w500null" || releaseYear == null) {
            return
        }
        console.log(index)
        
            return (
                <Movie 
                    title={title}
                    releaseYear={releaseYear}
                    imageUrl={imageUrl}
                    reviewMark={reviewMark}
                    overview={overview}
                    movieId={movieId}
                    key={movieId}
                    ref={props.data.length === (index + 1) ? ref : null}
                />
            )  
        
           
       

        
    })
    console.log(movieData)
    return movieData

}