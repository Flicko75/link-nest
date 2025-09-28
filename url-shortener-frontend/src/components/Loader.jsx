import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-1">
                <FadeLoader color="#139f3a" />
            </div>
        </div>
    )
}

export default Loader
