/* eslint-disable react/prop-types */
import {forwardRef} from 'react'

const Actor = forwardRef(function Actor(props, ref) {
    
    const openInNewTab = () => {
        window.open(`https://www.themoviedb.org/person/${props.actorId}/`, "_blank", 'noopener,noreferrer');
    };
    
    return (
        <div ref={ref} className="actorBox">
            <div className="actorInfo" >
                <div className="actorPicture">
                    <img  src={props.imageUrl} onClick={() => openInNewTab()}/>
                </div>
                <div className="actorName">{props.name}</div>
            </div>
            <div className="actorMovies">
                {props.knownFor}
            </div>
        </div>  
    )
})

export default Actor