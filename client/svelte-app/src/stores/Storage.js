import {FIREBASE_STORAGE,generateRandomToken} from "./Firebase"
import {ref,uploadBytes,getDownloadURL,deleteObject} from "firebase/storage"

export const uploadDesign=async (file)=>{
    const token=generateRandomToken();
    let ext=file.name.split(".")
    /* fix needed for file name like fileName.v1.mp3*/
    const storageRef = ref(FIREBASE_STORAGE,`DesignBlitz/2023/${token}.${ext[1]}`);
    let res=await uploadBytes(storageRef, file);
    let imgUrl=await getDownloadURL(res.ref);
    return imgUrl;
}

export const deleteDesign=async (url)=>{
    const storageRef=ref(FIREBASE_STORAGE,url);
    await deleteObject(storageRef);

}