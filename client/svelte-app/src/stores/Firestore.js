import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./Firebase";
import { collection, doc, Firestore, getDoc, getDocs, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";

/* to do rename all design related db function to Candidate
        i.e postDesgin()==> postCandidate();
*/




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
    return collection(FIREBASE_FIRESTORE,"/Candidates");
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

export const postDesing=async (name,imgSrc,p_code)=>{
    const collec=generateDesignCollection();
    const docRef=doc(collec);
    let sentData={name:name,img:imgSrc,p_code:p_code+1}; // p_code for acit; pcode is just length +1 of number pf alreade inserted candidates
    await setDoc(docRef,sentData);
    return {id:docRef.id,...sentData};
}

