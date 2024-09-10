import { storage } from './config/firebase.conf'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
const uploadSingleFile = (file) => {

    const imgRef = ref(storage, `avatar/${Date.now().toString()}/${file.name}`);
    return new Promise((resolve, reject) => {
        uploadBytesResumable(imgRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(url => {
                resolve({ display_url: url, bucket_url: snapshot.ref.fullPath })
            })
        })
            .catch(err => {
                console.log(err);
                reject("Error uploading")
            })
    })
}


const deleteSingleImage = (bucket_url) => {
    const imgRef = ref(storage, bucket_url);
    return new Promise((resolve, reject) => {

        deleteObject(imgRef).then(res => resolve(res))
            .catch(err => reject(err))
    })
}
export { uploadSingleFile, deleteSingleImage }