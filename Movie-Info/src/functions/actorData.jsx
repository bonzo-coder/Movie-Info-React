import Actor from '../components/Actor'
import Movie from '../components/Movie'

export default function actorDataProcess (props, ref) {

    const actorData = props.data?.map( actor => {
        
        if (actor.popularity < 0.8) {
            return
        }
        
        const name = actor.name;
        const index = actor.index;
        const imageUrl = "https://image.tmdb.org/t/p/w500" + actor.profile_path;
        const actorId = actor.id;
        const knownFor = actor.known_for.map( (movie) => {
            const title = movie.original_title;
            const releaseYear = movie.release_date?.slice(0,4);
            const movieMark = movie.vote_average;
            const posterUrl= "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            const movieId = movie.id;
            
            return (
                <Movie
                    title={title}
                    releaseYear={releaseYear}
                    imageUrl={posterUrl}
                    reviewMark={movieMark}
                    key={movieId}
                    movieId={movieId}
                />
            )

        })

        // rejects actors without lasname
        if ( name.indexOf(' ') == -1) {
            return
        }
        // rejects actors without picture 
        if( imageUrl == "https://image.tmdb.org/t/p/w500null" ) {
            return
        }

        return (
            <Actor 
                name={name}
                imageUrl={imageUrl}
                knownFor={knownFor}
                key={actorId}
                actorId={actorId}
                ref={props.data.length === (index + 1) ? ref : null}
            />
        )
    })

    return actorData
}