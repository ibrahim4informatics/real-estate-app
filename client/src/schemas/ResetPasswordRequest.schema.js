import * as Y from 'yup'


export default Y.object({
    email: Y.string().required("ce champs est obligatoire").email("l'adresse email est invalide")
});