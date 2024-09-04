import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const SinglePostMap = ({ property_postion, height, width }) => {
    return (
        <MapContainer center={property_postion} zoom={16} style={{ height, width }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker  position={property_postion}>
                <Popup className='custom-popup'>
                    <p>Location</p>
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default SinglePostMap