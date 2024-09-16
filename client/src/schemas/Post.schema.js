import * as Y from 'yup';

const property_types = ['APARTMENT', 'VILLA', 'HOUSE', 'OFFICE', 'STUDIO', 'GARAGE', 'OTHER'];
const propertiesStatus = ['FOR_SALE', 'FOR_RENT'];

export default Y.object({
    title: Y.string()
    .min(5, 'le titre doit contenir au moins 5 caractères')
    .max(200, 'le titre doit contenir au maximum 200 caractères')
    .required('le champ est obligatoire'),

    description: Y.string()
        .required('le champ est obligatoire')
        .min(20, 'la description doit contenir au moins 20 caractères')
        .max(3000, 'la description doit contenir au maximum 3000 caractères'),

    surface: Y.number()
        .integer('la surface doit être un nombre entier')
        .required('le champ est obligatoire')
        .min(1, 'la surface doit être supérieure à 1'),

    floor: Y.number()
        .integer('l\'étage doit être un nombre entier')
        .required('le champ est obligatoire')
        .min(0, 'l\'étage doit être positif ou nul'),

    type: Y.string()
        .required('le champ est obligatoire')
        .oneOf(property_types, 'type incorrect'),

    living_rooms: Y.number()
        .integer('le nombre de salons doit être un nombre entier')
        .required('le champ est obligatoire')
        .min(0, 'accepte uniquement les valeurs positives'),

    bath_rooms: Y.number()
        .integer('le nombre de salles de bains doit être un nombre entier')
        .required('le champ est obligatoire')
        .min(0, 'accepte uniquement les valeurs positives'),

    bed_rooms: Y.number()
        .integer('le nombre de chambres doit être un nombre entier')
        .required('le champ est obligatoire')
        .min(0, 'accepte uniquement les valeurs positives'),

    garages: Y.number()
        .integer('le nombre de garages doit être un nombre entier')
        .required('le champ est obligatoire')
        .min(0, 'accepte uniquement les valeurs positives'),

    address: Y.string()
        .required('le champ est obligatoire')
        .min(5, 'l\'adresse doit contenir au moins 5 caractères'),

    wilaya: Y.string()
        .required('le champ est obligatoire')
        .min(3, 'la wilaya doit contenir au moins 3 caractères'),

    city: Y.string()
        .required('le champ est obligatoire')
        .min(3, 'la commune doit contenir au moins 3 caractères'),

    attitude: Y.number()
        .required('le champ est obligatoire'),

    longitude: Y.number()
        .required('le champ est obligatoire'),

    price: Y.number()
        .required('le champ est obligatoire')
        .min(1, 'le prix doit être supérieur à 0'),

    status: Y.string()
        .required('le champ est obligatoire')
        .oneOf(propertiesStatus, 'statut incorrect'),

    // media: Y.array(Y.object({
    //     display_url: Y.string().required('il faut ajouter au moins une photo'),
    //     bucket_url: Y.string().required('il faut ajouter au moins une photo')
    // })).min(1, 'il faut ajouter au moins une photo')
});