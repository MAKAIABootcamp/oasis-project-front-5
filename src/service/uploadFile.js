
const uploadFile = async (file) => {
    
    const cloudName = 'dctajxhwc'
    const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const uploadPreset = 'user-profile-image-delivery-food'

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    try {
        const response = await fetch(urlCloudinary, {
          method: "post",
          body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('URL de la imagen cargada a Cloudinary:', data.secure_url);
            return data.secure_url;
          } else {
            console.error('Error al cargar la imagen a Cloudinary:', response.status, response.statusText);
            return null;
          }
        } catch (error) {
          console.error('Error al cargar la imagen a Cloudinary:', error);
          return null;
        }
      };

export default uploadFile;