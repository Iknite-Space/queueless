import axios from "axios";

export const handleFileUpload = async (file) => {

  if (!file) return;

  const data = new FormData()

  data.append("file", file)
  data.append("upload_preset", "qless-app")
  data.append("cloud_name", "duk4sh1ny")

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/duk4sh1ny/image/upload", data)
  
    return response.data.secure_url
  } catch(error) {
    console.log("Error saving image on cloudinary:", error)
  }
  
}