// import {v2 as cloudinary} from 'cloudinary';
// cloudinary.config({ 
//   cloud_name: 'dlignr2a2', 
//   api_key: '864743945189589', 
//   api_secret: '_bNg3A7bwgI0uvYBbPYm0Fjk9YY' 
// });

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: 'dfyvwloys',
    api_key: '923835526253933',
    api_secret: 'JeNHRhqCYIfpkgu9hVcjwgf3P4A'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        return response.url
    } catch (error) {
        fs.unlink(localFilePath)
    }
}

export {
    uploadOnCloudinary
}