<script>
    import { onDestroy, onMount } from 'svelte';
    import {generateDesignCollection,listenToCollection,postDesing} from "../../../stores/Firestore";
    import {uploadDesign,deleteDesign} from "../../../stores/Storage";
    import { deleteDoc, doc } from 'firebase/firestore';
    /** @type {import('./$types').PageData} */
    //export let data;
    const unSubscribe=[];
    let designs={};
    function dictLen(dic){
        return Object.keys(dic).length
    }
    onMount(async()=>{
        const designCollec=generateDesignCollection();
        let unSub=await listenToCollection(designCollec,async(action,data)=>{
            if(action==="removed"){
                delete designs[data.id];
                designs=designs;
                return;
            }
            designs[data.id]=data;
            designs=designs;
            console.log(designs)
        })
        unSubscribe.push(unSub)

    })
    onDestroy(async()=>{
        for(let i of unSubscribe)await i();
    })

    let name="";
    let files=null;
    let uploading=false;
    const upload=async()=>{
        if(name.length<3){alert("name to short");return;}
        if(!files || files.length==0){alert("Plsea select a file");return;}
        console.log(name);
        console.log(files[0]);
        uploading=true;
        try{
        let imgSrc=await uploadDesign(files[0]);
        let res=await postDesing(name,imgSrc);
        name="";
        uploading=false;
        return res;
        }catch(err){
            console.log(err);
            alert("Error uploading file");
        }
        uploading=false;
        return "h";
    };
    const delDesign=async(id)=>{
        const designCollec=generateDesignCollection();
        try{
            let res=await deleteDesign(designs[id].img);
            res=await deleteDoc(doc(designCollec,id));

        }catch(err){
            alert("error deleting file");
        }
    }
</script>
{#if uploading}
    uploading.....
{:else}
Name: <input bind:value={name} type="text"> <br>
File: <input bind:files={files} type="file"> <br>
<button on:click={upload}>upload</button> <br>
{/if}

{#if dictLen(designs)==0}
    No Design found!
{:else}
    {#each Object.entries(designs) as [key,val] }
        <div style="padding-left: 50px;">
            {val.name} {#if val.img}<img src={val.img} alt="no img huhuhu">{/if} <br>
            <button on:click={()=>{delDesign(key)}}>delete</button>
        </div>
    {/each}
{/if}