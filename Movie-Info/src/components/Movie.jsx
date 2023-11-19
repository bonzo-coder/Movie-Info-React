

export default function Movie (props) {
    console.log(props)
    return (
        <div className="movieBox">
            <div className="movieYear">{props.releaseYear}</div>
            <div className="movieImg"><img src={props.imageUrl}/></div>
            <div className="movieTitle"><p>{props.title}</p></div>
        </div>
    )
} 