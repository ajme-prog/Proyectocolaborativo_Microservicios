import React from 'react'
import { SolicitudCard } from './SolicitudCard'

export const SolicitudScreen = () => {
    return (
        <>
            <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-8/12 px-4">
                    <SolicitudCard />
                    {/* <h1>Solicitudes de libros!!</h1> */}
                </div>
            </div>
            
        </>
    )
}
