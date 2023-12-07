/* eslint-disable react/prop-types */

import React from 'react'
import movieDataProcess from '../functions/movieData'
import actorDataProcess from '../functions/actorData'

const Body = React.forwardRef(function Body(props, ref) {
    console.log(props)
    console.log(ref)
    const [renderDataPage, setRenderDataPage] = React.useState()

        React.useEffect ( () => {
        if (props.searchFor == "movie") {
            setRenderDataPage(movieDataProcess(props, ref))
        } else {
            setRenderDataPage(actorDataProcess(props, ref))
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

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
})

export default Body