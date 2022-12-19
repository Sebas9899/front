import axios from 'axios';

export const cloudinaryImages = async ( value ) => {

    const resp = await axios.post("https://api.cloudinary.com/v1_1/samuelrm5/image/upload", value )
    .then( res => res )
    .catch( err => err.response )
    return resp;

}

export const uploadImage = async files => {
    const formData = new FormData()
    formData.append("file", files)
    formData.append("upload_preset", 'm8xbe6bu')

    return await cloudinaryImages(formData);
}