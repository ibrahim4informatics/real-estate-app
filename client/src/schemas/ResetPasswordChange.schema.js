import * as Y from 'yup'

const passwordErrorMessage = "le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, une minuscule et un caractère spécial et un chiffre au moins"
export default Y.object({
    password: Y.string().required('ce champs est obligatoire').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: passwordErrorMessage }),
    confirm: Y.string().required('ce champs est obligatoire').oneOf([Y.ref('password')], 'les mots de passe doivent être identiques')
});