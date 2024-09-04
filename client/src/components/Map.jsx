import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css'
import { Text } from '@chakra-ui/react';
import useFowardGeoLocation from '../hooks/useFowardGeoLocation';



const RedIcon = new L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]

})



const Map = ({ width, height, zoom, center, properties_locations, user_lat, user_lon, params }) => {

    const mapRef = useRef(null)

    // useEffect(() => {
    //     if (mapRef.current !== null) {
    //         const map = mapRef.current

    //         if ((params.get('city') || params.get('wilaya')) && properties_locations) {

    //             map.flyTo([properties_locations[0].lat, properties_locations[0].long], 9)

    //         }
    //         else{
    //             map.flyTo([28.961245, 2.714912], 5)
    //         }
    //     }
    // }, [center, params])

    const { coordinates, isLoading, errorMessage } = useFowardGeoLocation(params.get('wilaya'));

    useEffect(() => {
        if (mapRef.current) {

            // mapRef.current.flyTo([coordinates.lat , coordinates.lon ],  9 )
            if (errorMessage || !coordinates.lat || !coordinates.lon) {
                mapRef.current.flyTo([28.961245, 2.714912], 5)
            }
            else if (coordinates.lat && coordinates.lon) {
                mapRef.current.flyTo([coordinates.lat, coordinates.lon], 9)
            }
        }

    }, [coordinates])








    return (
        <MapContainer ref={mapRef} center={[28.961245, 2.714912]} zoom={5} style={{ height, width }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {properties_locations && properties_locations.length > 0 ? properties_locations.map(property_location => {
                return (
                    <Marker key={property_location.id} position={[property_location.lat, property_location.long]}>
                        <Popup>
                            <Text my={1} ml={1} fontSize={12} fontWeight={'bold'} color={'black'}>{property_location.title}</Text>
                        </Popup>
                    </Marker>
                )
            }) : ''}
        </MapContainer>
    )
}

export default Map