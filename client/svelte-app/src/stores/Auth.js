import { writable } from "svelte/store";
import { onDestroy, onMount } from "svelte";

import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./Firebase";

export const User=writable(null);
export const Loading=writable(true);
export const Error=writable(null);

export const AUTH_STATE_LISTENER=()=>{
    let stateHandler=null;
    onMount(()=>{
       stateHandler= onAuthStateChanged(FIREBASE_AUTH,async (user)=>{
            if(user){
                let token=await user.getIdTokenResult(true);
                user.__token__=token.claims
                User.update((v)=>{return user}) 
            }else{
                User.update((v)=>{return null})
            }
            Loading.update((loading)=>{return false;});
        })
    })
    onDestroy(()=>{
        if(stateHandler)stateHandler();
        Loading.update((loading)=>{return true;});
        User.update((prevValue)=>{return null})
    })
}

