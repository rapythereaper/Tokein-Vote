<script>
    import { onMount } from "svelte";
    export let User;
    import { FIREBASE_FIRESTORE } from "../../stores/Firebase";
    import {
        generateVoteCollection,
        generateDesignCollection,
        fetchDocs,
        fetchDoc,
        postVote,
    } from "../../stores/Firestore";
    let status = "loading";
    let design = [];
    onMount(async () => {
        const voteCollec = generateVoteCollection();
        const designCollec = generateDesignCollection();
        let res = await fetchDoc(voteCollec, $User.__token__.id);
        if (res) {
            design = [await fetchDoc(designCollec, res.vote)];
            console.log(design);
            status = "voted";
        } else {
            design = await fetchDocs(designCollec);
            status = "not-voted";
        }
    });
    const vote = async (designId) => {
        let res = await postVote($User.__token__.id, designId);
        for (let i of design) {
            if (i.id == designId) {
                design = [i];
                break;
            }
        }
        status = "voted";
    };
</script>

<h1 class="text-5xl font-bold">Voting Portal</h1>
{#if status == "loading"}
    Loading...
{:else}
    {#if design.length == 0}
        <p class="py-6 text-xl">
            Sorry No design Found.<span class="text-5xl font-bold"> 😢 </span>
        </p>
    {:else if status=="not-voted"}
        <p class="py-6">These are the Top {design.length} designs. Vote for the best one!</p>  
        {#each  design as de}
            <div class="card w-96 bg-base-100 shadow-xl" style="margin-bottom:10px">
                <figure class="px-10 pt-10">
                    <img
                        src="{de.img}"
                        alt="Shoes"
                        class="rounded-xl"
                    />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">{de.name}</h2>
                    <p>Designer's short description</p>
                    <div class="card-actions">
                        <button class="btn btn-secondary" on:click={()=>{window.open(`${de.img}`,"_blank")}}>View Design</button>
                        <button class="btn btn-primary" on:click={()=>{document.getElementById(`${de.id}`).showModal()}}
                            >Vote Now</button
                        >
                        <dialog id="{de.id}" class="modal">
                            <div class="modal-box w-11/12 max-w-5xl">
                                <h3 class="font-bold text-lg">Almost there!</h3>
                                <p class="py-4">Are you sure you want to vote Design {de.name}?</p>
                                <div class="modal-action">
                                    <form method="dialog">
                                        <button class="btn btn-error">Cancel</button>
                                        <button class="btn btn-success" on:click={vote(de.id)}>Confirm</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        {/each}
    {:else if status == "voted"}
        <p class="py-6 text-xl">
            Congratulations! on voting successfully.<span class="text-5xl font-bold">🎉</span>
        </p>
        {#each design as de }
            <div class="card w-96 bg-base-100 shadow-xl card-bg" style="margin-bottom:10px">
                <figure class="px-10 pt-10">
                    <img
                        src="{de.img}"
                        alt="Shoes"
                        class="rounded-xl"
                    />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">{de.name}</h2>
                    <p>You voted for {de.name}</p>
                    <div class="card-actions">
                        <button class="btn btn-block btn-secondary" 
                            on:click={()=>{document.location="/DesignComp/ViewVote"}}>
                            Go to live voting
                        </button>
                    </div>
                </div>
            </div>   
        {/each}

    {/if}

{/if}







<!--
{#if status == "loading"}
    Loading...
{:else}
    {#if design.length == 0}
        <br />No design Found!<br />
    {:else if status == "voted"}
        <br /> Your vote to:<br />
    {:else if status == "not-voted"}
        <br /> plese select one design :<br />
    {/if}

    {#each design as de}
        {de.name}<button
            on:click={() => {
                vote(de.id);
            }}>vote</button
        ><br />
    {/each}
{/if}
-->

<style>
.card-bg{
    background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
    }
</style>