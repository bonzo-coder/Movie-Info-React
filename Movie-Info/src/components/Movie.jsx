import {forwardRef} from 'react'

const Movie = forwardRef(function Movie(props, ref) {
   
    const openInNewTab = () => {
        window.open(`https://www.themoviedb.org/movie/${props.movieId}/`, "_blank", 'noopener,noreferrer');
    };
    
    return (
        <div ref={ref} className="movieBox">
            <div className="movieYear">{props.releaseYear}</div>
            <div className="movieImg" onClick={() => openInNewTab()}>
                <img src={props.imageUrl}/>
                <div className="overview">
                    <div className="scroll">{props.overview}</div>
                </div>
            </div>
            <div className="movieTitle">
                <div>{props.title}</div>
            </div>
            <div className="movieMark">
                <p>{props.reviewMark.toFixed(1)}<span>/10</span></p>
            </div>
        </div>
    )
}) 

export default Movie