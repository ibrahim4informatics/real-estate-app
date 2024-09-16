import { storage } from './config/firebase.conf'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
const uploadSingleFile = (file, path) => {

    const imgRef = ref(storage, `${path}/${Date.now().toString()}-${file.name}`);
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

// const uploadPostImeages = (images, user_id) => {
//     const promises = images.map(img => {
//         const imgRef = ref(storage, `${user_id}/${Date.now().toString()}-${img.name}`);
//          return uploadBytesResumable(imgRef, img).then(snapshot => getDownloadURL(snapshot.ref).then(url => ({ display_url: url, bucket_url: snapshot.ref.fullPath })))
//     })
//     return Promise.all(promises)
// }

const uploadPostImages = async (images) => {

    try {

        const promises = images.map(async (img) => {
            const imgRef = ref(storage, `properties/${Date.now().toString()}-${img.name}`);
            const snapshot = await uploadBytesResumable(imgRef, img);
            const url = await getDownloadURL(snapshot.ref);
            return { display_url: url, bucket_url: snapshot.ref.fullPath }
        });

        return Promise.all(promises);

    }

    catch (err) {
        throw new Error(err);
    }

}
export { uploadSingleFile, deleteSingleImage, uploadPostImages }