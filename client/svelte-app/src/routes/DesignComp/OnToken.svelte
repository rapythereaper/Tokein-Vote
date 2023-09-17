<script>
    export let TokenId;
    export let UserTokenId;
    import {signInWithEmailAndPassword} from "firebase/auth"
    import {FIREBASE_AUTH} from "../../stores/Firebase"
    import { onMount } from "svelte";
    import { Loading } from "../../stores/Auth";
    let status="loading"
    onMount(async ()=>{
        try{
            let user=await signInWithEmailAndPassword(FIREBASE_AUTH,`${TokenId}@vote.com`,TokenId);
            if (!UserTokenId) status="failed";
        }catch(err){    
            status="failed"
        }
        console.log(status)
    
    })
</script>
<div>
{#if status==="loading"}
    Loading....
{:else if status=="failed"}
    Invalid token scanned!
{/if}
</div>
{TokenId}
<button on:click={()=>{document.location="/DesignComp"}}> goback </button>