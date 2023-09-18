<script>
    export let TokenId;
    export let UserTokenId;
    import {signInWithEmailAndPassword} from "firebase/auth"
    import {FIREBASE_AUTH} from "../../stores/Firebase"
    import { afterUpdate, onMount } from "svelte";

    import { blur } from 'svelte/transition';

    let status="loading"

    const onToken=async()=>{
        console.log(TokenId);
        if(!TokenId)return;
        try{
            let user=await signInWithEmailAndPassword(FIREBASE_AUTH,`${TokenId}@vote.com`,TokenId);
            if (!UserTokenId)status="failed";

        }catch(err){    
            status="failed"
        }
        TokenId=null;
        console.log(status);
        if(status=="failed"){
            setTimeout(()=>{
                status="loading";
            },1000*3)
        }
    }
    afterUpdate(async ()=>{
        console.log(TokenId);
        await onToken();
    })
</script>

{#if status=="failed"}
    <div class="alert alert-error" transition:blur={{ amount: 10,duration:1000 }} style="margin-top:20px">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Warning: Invalid Token! Enter again!</span>
    </div>
{/if}
