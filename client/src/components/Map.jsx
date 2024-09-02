import React from 'react';
import { MapContainer, TileLayer, Popup, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css'

const Map = ({ width, height, zoom, center, properties_locations }) => {
    return (
        <MapContainer  center={center} zoom={zoom} style={{ height, width }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker  position={center}>
                <Popup className='custom-popup'>
                    <p>me</p>
                </Popup>
            </Marker>
            {properties_locations && properties_locations.length > 0 ? properties_locations.map(property_location => {
                return (
                    <Marker key={property_location.lat + "--"+ property_location.long} position={[property_location.lat, property_location.long]}>
                        <Popup>
                        </Popup>
                    </Marker>
                )
            }) : ''}
        </MapContainer>
    )
}

export default Map