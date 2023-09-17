<script>
    import { onDestroy, onMount } from 'svelte';

    import {generateVoteCollection,generateDesignCollection, fetchDocs,listenToCollection} from "../../../stores/Firestore";
    /** @type {import('./$types').PageData} */
    //export let data;
    let status="loading"; //-- loading, no-design, fetched-design
    let designs=[];
    let vote={};
    const unSubscribe=[];
    onMount(async ()=>{
        const designCollec=generateDesignCollection();
        const voteCollec=generateVoteCollection();
        designs=await fetchDocs(designCollec);
        if(!designs){
            status="no-design";
            return;
        }
        let unSub=await listenToCollection(voteCollec,async(action,data)=>{
            console.log(data);
            if(vote[data.vote])vote[data.vote]+=1;
            else vote[data.vote]=1;
        })
        unSubscribe.push(unSub);
        status="fetched-design"

    })
    onDestroy(async()=>{
        for(let i of unSubscribe)await i();
    })
</script>

{#if status=="loading"}
    Loading.....
{:else if status=="fetched-design"}
    {#each designs as de }
       <br> {de.name} -> {vote[de.id]||0}<br>
    {/each}
{:else}
    no data found!
{/if}
