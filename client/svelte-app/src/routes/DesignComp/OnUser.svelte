<script>
    import { onMount } from "svelte";
    export let User;
    import {FIREBASE_FIRESTORE} from "../../stores/Firebase"
    import { generateVoteCollection,generateDesignCollection,fetchDocs,fetchDoc, postVote} from "../../stores/Firestore"
    let status="loading";
    let design=[];
    onMount(async()=>{
        const voteCollec=generateVoteCollection();
        const designCollec=generateDesignCollection();
        let res=await fetchDoc(voteCollec,$User.__token__.id);
        if(res){
            design=[await fetchDoc(designCollec,res.vote)];
            console.log(design)
            status="voted";
        }else{
            design=await fetchDocs(designCollec);
            status="not-voted";
        }
    })
    const vote=async (designId)=>{
        let res=await postVote($User.__token__.id,designId);
        for(let i of design){
            if(i.id==designId){
                design=[i];
                break;
            }
        }
        status="voted"
    }
</script>
{$User.email}
{#if status=="loading"}
    Loading...
{:else}
    {#if design.length==0}
        <br>No design Found!<br>
    {:else if status=="voted"}
       <br> Your vote to:<br>

    {:else if status=="not-voted"}
       <br> plese select one design :<br>
    {/if}

    {#each design as de }
       {de.name}<button on:click={()=>{vote(de.id)}}>vote</button><br>
    {/each}
    


{/if}
