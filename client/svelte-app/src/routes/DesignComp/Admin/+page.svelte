<script>
    import { onDestroy, onMount } from "svelte";
    import {
        generateDesignCollection,
        listenToCollection,
        postDesing,
    } from "../../../stores/Firestore";
    import { uploadDesign, deleteDesign } from "../../../stores/Storage";
    import { deleteDoc, doc } from "firebase/firestore";
    /** @type {import('./$types').PageData} */
    //export let data;
    const unSubscribe = [];
    let designs = {};
    function dictLen(dic) {
        return Object.keys(dic).length;
    }
 
    onMount(async () => {
        const designCollec = generateDesignCollection();
        let unSub = await listenToCollection(
            designCollec,
            async (action, data) => {
                if (action === "removed") {
                    delete designs[data.id];
                    designs = designs;
                    return;
                }
                designs[data.id] = data;
                designs = designs;
                console.log(designs);
            }
        );
        unSubscribe.push(unSub);
    });
    onDestroy(async () => {
        for (let i of unSubscribe) await i();
    });

    let name = "";
    let files = null;
    let uploading = false;
    const upload = async () => {
        if (name.length < 3) {
            alert("name to short");
            return;
        }
        if (!files || files.length == 0) {
            alert("Plsea select a file");
            return;
        }
        console.log(name);
        console.log(files[0]);
        uploading = true;
        try {
            let imgSrc = await uploadDesign(files[0]);
            let res = await postDesing(name, imgSrc);
            name = "";
            alert("upload sucess");
            uploading = false;
            return res;
        } catch (err) {
            console.log(err);
            alert("Error uploading file");
        }
        uploading = false;
        return "h";
    };
    const delDesign = async (id) => {
        const designCollec = generateDesignCollection();
        try {
            let res = await deleteDesign(designs[id].img);
            res = await deleteDoc(doc(designCollec, id));
        } catch (err) {
            alert("error deleting file");
        }
    };
</script>

    <p class="py-6">Manage your designs here!</p>

    <div class="card w-116 bg-base-100 shadow-xl" style="margin-bottom:10px">
        <div
            class="alert alert-info"
            style="text-align: center !important; display:block;border-bottom-left-radius:0px;border-bottom-right-radius:0px"
        >
            Add New Designs Here
        </div>
        <div class="card-body items-center text-center">
            <input
                bind:value={name}
                type="text"
                placeholder="Design's name"
                class="input input-bordered input-success w-full max-w-xs"
            />
            <input
                bind:files
                type="file"
                class="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            {#if !uploading}
                <button on:click={upload} class="btn btn-success">Add design</button>
            {:else}
                <button class="btn">
                    <span class="loading loading-spinner"></span>
                    uploading ...
                </button>
            {/if}
        </div>
    </div>


<p class="py-6 text-xl">Uploaded designs</p>

{#if dictLen(designs) == 0}
    <p class="py-6">
        Sorry no design found at the moment <span class="text-5xl font-bold"
            >😿</span
        >
    </p>
{:else}
    {#each Object.entries(designs).reverse() as [key, val]}
        <div
            class="card w-96 bg-base-100 shadow-xl card-bg"
            style="margin-bottom:10px"
        >
            <figure class="px-10 pt-10">
                <img
                    src="{val.img}"
                    alt="Shoes"
                    class="rounded-xl"
                />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{val.name}</h2>
                <p>machikne randi ho timihuru sbai randi ho</p>
                <div class="card-actions">
                    <button
                        class="btn btn-error btn-wide btn-secondary"
                        on:click={()=>{document.getElementById(`${val.id}`).showModal()}}>Delete</button
                    >
                    <dialog id="{val.id}" class="modal">
                        <div class="modal-box w-11/12 max-w-5xl">
                            <h3 class="font-bold text-lg">Almost there!</h3>
                            <p class="py-4">
                                Are you sure you want to delete {val.name}?
                            </p>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn btn-error">Cancel</button
                                    >
                                    <button class="btn btn-success"  on:click={() => {delDesign(key);}}
                                        >Confirm</button
                                    >
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    {/each}
{/if}
