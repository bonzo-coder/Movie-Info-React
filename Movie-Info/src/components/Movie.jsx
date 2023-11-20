

export default function Movie (props) {
    console.log(props)

    const openInNewTab = () => {
        window.open(`https://www.imdb.com/title/${props.imdbID}/`, "_blank", 'noopener,noreferrer');
      };
    

    return (
        <div className="movieBox">
            <div className="movieYear">{props.releaseYear}</div>
            
                <div className="movieImg" onClick={() => openInNewTab()}>
                    <img src={props.imageUrl}/>
                </div>
            
            <div className="movieTitle"><p>{props.title}</p></div>
        </div>
    )
} 