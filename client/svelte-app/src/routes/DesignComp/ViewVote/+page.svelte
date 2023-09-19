<script>
    import { onDestroy, onMount } from 'svelte';
    import Loading from '$lib/components/Loading.svelte';

    import {generateVoteCollection,generateDesignCollection, fetchDocs,listenToCollection} from "../../../stores/Firestore";
    import BarGraph from './BarGraph.svelte';
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
        if(designs.length==0){
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
    <Loading/>
{:else if status=="fetched-design"}
    <p class="py-6">
        Live Vote Count:
    </p>
    <BarGraph xValues={designs} bind:yValues={vote} />
    <p class="py-6"></p>
    <h1 class="text-4x2 font-bold">Tabular Data</h1>
    <div class="overflow-x-auto">
        <table class="table table-zebra">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Design</th>
              <th>Name</th>
              <th>Vote Count</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            {#each designs as de,i }
            <tr>
                <th>{i+1}</th>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                          <div class="mask mask-squircle w-12 h-12">
                            <img src="{de.img}" alt="Design" />
                          </div>
                        </div>
                    </div>
                </td>
                <td>{de.name}</td>
                <td>{vote[de.id]||0}</td>
                <!-- br> {de.name} -> {vote[de.id]||0}<br-->
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
       
   
{:else}
    <h1 class="text-5xl font-bold">Live Vote Count</h1>
    <p class="py-6">
        Sorry no data found at the moment <span class="text-5xl font-bold">😿</span>
</p>
{/if}
