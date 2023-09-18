<script>

    import { User } from '../../stores/Auth';
    import OnToken from './OnToken.svelte';
    import OnUser from './OnUser.svelte';
    const urlParams = new URLSearchParams(window.location.search);
    let TokenId = urlParams.get('token_id');
    let inputToken

    /** @type {import('./$types').PageData} */
    //export let data;
</script>

{#if $User && $User.__token__.id}
    <OnUser User={User}/>
{:else}
    <!-- not loged in give input field-->
    <h1 class="text-5xl font-bold">Welcome to <br>ACIT Design Blitz -2023!</h1>
    <p class="py-6">To Vote your favourite design, please enter the token. </p>
    <input bind:value={inputToken} type="text" placeholder="Enter the token" class="input input-bordered w-full max-w-xs" />
    {#if !TokenId}
        <button on:click={()=>{TokenId=inputToken}} class="btn btn-primary">Submit</button>
    {:else}
        <button  class="btn btn-square" >
            <span class="loading loading-spinner"></span>
        </button>
    {/if}
    <OnToken bind:TokenId  UserTokenId={undefined}></OnToken>

{/if}