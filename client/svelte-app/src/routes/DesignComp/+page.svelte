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
{:else if TokenId}
    <OnToken TokenId={TokenId} UserTokenId={undefined}></OnToken>
{:else}
    <!-- not loged in give input field-->
    <div>
        Token id: <input bind:value={inputToken}><br>
        <button on:click={()=>{TokenId=inputToken}}>submit</button>
    </div>
{/if}