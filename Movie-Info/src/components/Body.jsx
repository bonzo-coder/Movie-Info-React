/* eslint-disable react/prop-types */

import React from 'react'
import movieDataProcess from '../functions/movieData'
import actorDataProcess from '../functions/actorData'

export default function Body (props) {

    const [renderDataPage, setRenderDataPage] = React.useState()

        React.useEffect ( () => {
        if (props.searchFor == "movie") {
            setRenderDataPage(movieDataProcess(props))
        } else {
            setRenderDataPage(actorDataProcess(props))
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data])

    console.log(renderDataPage)

    return (
        <div>
            <div className="movies">
                {props.searchFor == "movie" && renderDataPage}
            </div>
            <div className="actors">
                {props.searchFor == "person" && renderDataPage}
            </div>
        </div>
    )
}