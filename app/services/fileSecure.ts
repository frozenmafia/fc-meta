import { AxSecure } from "./axSecure";

class FileSecure extends AxSecure{
    constructor(){
        super(process.env.NEXT_PUBLIC_FILE_URL || '');
    }

    uploadThumbnail(file:File){
        const formData = new FormData();
        formData.append("image", file);
        return this.post("/thumbnails/upload", formData);

    }

    uploadImage(file:File){
        const formData = new FormData();
        formData.append("image", file);
        return this.post("/images/upload", formData);
    }
    


}

const filesecure = new FileSecure();
export default filesecure;