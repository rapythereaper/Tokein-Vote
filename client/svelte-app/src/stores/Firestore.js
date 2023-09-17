import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./Firebase";
import { collection, doc, Firestore, getDoc, getDocs, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export const generateTeacherCollection=(collage_name)=>{
    /* 
        collc:  /Collages/{collageName}/Teachers/{teacherId}/ 
        /Collages/Randi Uni/Teachers
    */
    return collection(FIREBASE_FIRESTORE,`/Collages/${collage_name}/Teachers`)
}




export const fetchDoc=async(collectionRef,id)=>{
    const docRef=doc(collectionRef,id);
    const data=await getDoc(docRef);
    if(data.exists()){
        return {id:data.id,...data.data()};
    }
    return null;
}
export const fetchDocs=async(collectionRef)=>{
    const docRef=await getDocs(collectionRef);
    let res=[]
    docRef.forEach((doc) => {
        console.log(doc.data());
        res.push({id:doc.id,...doc.data()})
    });
    return res;
}
export const listenToCollection=async (colletionRef,callback)=>{
    return onSnapshot(colletionRef,(snap)=>{
        snap.docChanges().forEach(async (change) => {
            let data={id:change.doc.id,...change.doc.data()};
            await callback(change.type,data);
        })
    })
}

export const fetchDocsListener=async(collectionRef)=>{
    return;
}

export const generateDesignCollection=()=>{
    return collection(FIREBASE_FIRESTORE,"/Design");
}
export const generateVoteCollection=()=>{
    return collection(FIREBASE_FIRESTORE,"/Votes");
}

export const postVote=async (voterId,designId)=>{
    const collec=generateVoteCollection();
    const docRef=doc(collec,voterId);
    let sentData={vote:designId};
    await setDoc(docRef,sentData);
    return {id:docRef.id,...sentData};
}

export const postDesing=async (name,imgSrc)=>{
    const collec=generateDesignCollection();
    const docRef=doc(collec);
    let sentData={name:name,img:imgSrc};
    await setDoc(docRef,sentData);
    return {id:docRef.id,...sentData};
}

export const postTeacherComment=async (collage_name,teacher_id,user_id,comment)=>{
    const commentCollection=generateCommentCollection(collage_name,teacher_id);
    const docRef=doc(commentCollection);
    let sentData={comment:comment,author:user_id,upVote:0,downVote:0,createdAt:serverTimestamp()};
    await setDoc(docRef,sentData);
    return {_id:docRef.id,...sentData};
}
