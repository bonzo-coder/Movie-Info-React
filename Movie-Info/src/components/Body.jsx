import Movie from './Movie'
import React from 'react'
import movieDataProcess from '../functions/movieData'
import actorDataProcess from '../functions/actorData'

export default function Body (props) {

    const [renderData, setRenderData] = React.useState()

        React.useEffect ( () => {
        if (props.searchFor == "movie") {
            setRenderData(movieDataProcess(props))
        } else {
            setRenderData(actorDataProcess(props))
        }
    
    }, [props.data])

    console.log(renderData)

    return (
        <div>
            <div className="movies">
                {props.searchFor == "movie" && renderData}
            </div>
            <div className="actors">
                {props.searchFor == "person" && renderData}
            </div>
        </div>
    )
}