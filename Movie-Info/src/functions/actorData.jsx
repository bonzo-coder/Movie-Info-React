import Actor from '../components/Actor'
import Movie from '../components/Movie'

export default function actorDataProcess (props) {
    console.log(props)
    console.log("actor prop")

    const actorData = props.data?.map( actor => {
        
       
        const name = actor.name;
        const imageUrl = "https://image.tmdb.org/t/p/w500" + actor.profile_path;
        //const imdbID = movie.imdbID;
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
                />
            )

        })

        console.log(name)
        console.log(knownFor)
        console.log(actorId)
        console.log(imageUrl)

        if( imageUrl == "https://image.tmdb.org/t/p/w500null" ) {
            return
        }

        return (
            <Actor 
                name={name}
                imageUrl={imageUrl}
                knownFor={knownFor}
                key={actorId}
            />
        )
    })

    return actorData

}