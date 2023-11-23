import Movie from "./Movie"

export default function Actor (props) {
    

    // const openInNewTab = () => {
    //     window.open(`https://www.imdb.com/title/${props.imdbID}/`, "_blank", 'noopener,noreferrer');
    //   };
    
    

    return (
        <div className="actorBox">
            <div className="actorInfo" >
                <div className="actorPicture">
                    <img  src={props.imageUrl}/>
                </div>
                <div className="actorName">{props.name}</div>
            </div>
            <div className="actorMovies">
                {props.knownFor}
            </div>
            
        </div>
            
                
            
          
    )
} 