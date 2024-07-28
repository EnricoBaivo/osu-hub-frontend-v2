"use client"
import ReactPlayer from 'react-player/youtube'

import React, { useEffect } from 'react'
import { Trailer } from '@/types/aniListMediaInterface'

const AnimieTrailer = (trailer: Trailer) => {
    const [isLoading, setIsLoading] = React.useState(true)
    useEffect(() => {
        setIsLoading(false)
    }, []

    )
    return isLoading ? <div>loading..</div> : (
        <ReactPlayer

            stopOnUnmount={true}
            light={trailer.thumbnail}
            url={`https://www.youtube.com/watch?v=${trailer.id}`}
            width="100%"
            height="100%"
        />


    )
}

export default AnimieTrailer