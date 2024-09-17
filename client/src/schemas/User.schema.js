import * as Y from 'yup';

export default Y.object({
    full_name: Y.string().min(3, "le nom doit etre composer de 3 characteres au moins").required('ce champ est obligatoire'),
    phone: Y.string().matches(/^(\+213(7|6|5))\d{8}$/, { message: "numero de telephone est invalide" }).required('ce champ est obligatoire'),
    role: Y.string().oneOf(['Vendeur', 'Client'], "le role doit etre soit vendeur ou client").required('ce champ est obligatoire')
})