import Movie from "./Movie"

export default function Actor (props) {
    console.log(props)

    // const openInNewTab = () => {
    //     window.open(`https://www.imdb.com/title/${props.imdbID}/`, "_blank", 'noopener,noreferrer');
    //   };
    
    

    return (
        <div className="actorBox">
            <div className="actorImg" >
                <img src={props.imageUrl}/>
            </div>
            <div>{props.name}</div>
            <div>{props.knownFor}</div>
        </div>
            
                
            
          
    )
} 