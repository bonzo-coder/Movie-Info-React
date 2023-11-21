import Movie from "../components/Movie";

export default function movieDataProcess (props) {
    console.log(props)
    console.log("movie prop")

    const movieData = props.data?.map( movie => {
        
       
        const title = movie.original_title;
        const releaseYear =movie.release_date.slice(0,4);
        const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        //const imdbID = movie.imdbID;
        const movieId = movie.id;
        const overview = movie.overview;
        const reviewMark = movie.vote_average;

        if( imageUrl == "https://image.tmdb.org/t/p/w500null" || releaseYear == null) {
            return
        }

        return (
            <Movie 
                title={title}
                releaseYear={releaseYear}
                imageUrl={imageUrl}
                reviewMark={reviewMark}
                overview={overview}
                key={movieId}
            />
        )
    })

    return movieData

}