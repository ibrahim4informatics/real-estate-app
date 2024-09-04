import { useEffect, useState } from "react"
import axios from "axios";

export default (name) => {
    const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const wilayas = [
        "ADRAR",
        "CHLEF",
        "LAGHOUAT",
        "OUM EL BOUAGHI",
        "BATNA",
        "BEJAIA",
        "BISKRA",
        "BORDJ BOU ARRERIDJ",
        "BOUIRA",
        "TAMANRASSET",
        "TEBESSA",
        "TLEMCE",
        "TIARET",
        "TIZI OUZOU",
        "ALGER",
        "DJELFA",
        "JIJEL",
        "SETIF",
        "SAIDA",
        "SKIKDA",
        "SIDI BEL ABBES",
        "ANNABA",
        "GUELMA",
        "CONSTANTINE",
        "MEDEA",
        "MOSTAGANEM",
        "MSILA",
        "MASCARA",
        "OUARGLA",
        "ORAN",
        "EL BAYADH",
        "EL OUED",
        "KHENCHELA",
        "SOUK AHRAS",
        "TIPAZA",
        "MILA",
        "AIN DEFLA",
        "NAAMA",
        "AIN TEMOUCHENT",
        "GHARDAIA",
        "EL MGHAR",
        "EL MENIA",
        "TOUGGOURT",
        "DJANET",
        "IN SALAH",
        "IN GUEZZAM",
        "TAMANRASSET",
        "TINDOUF",
        "TISSEMSILT",
        "MOULAY SLISSEN"
    ]



    useEffect(() => {
        if (!name) return
        const wilaya = wilayas.filter(w => name.toUpperCase() === w);
        if (wilaya.length > 0) {
            axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${wilaya[0]}&countrycode=dz`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.length > 0) {
                        setCoordinates({ lat: res.data[0].lat, lon: res.data[0].lon })
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    setErrorMessage(err || "Error while getting Data");
                    setIsLoading(false);
                })
        }

        else {
            setCoordinates({ lat: null, lon: null });
            setIsLoading(false);
            setErrorMessage(null);
        }
    }, [name])

    return { coordinates, isLoading, errorMessage };
}