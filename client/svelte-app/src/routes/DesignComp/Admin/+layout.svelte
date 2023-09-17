<script>
    /** @type {import('./$types').LayoutData} */
    import {User} from "../../../stores/Auth"
</script>

{#if !$User || !$User.__token__.isAdmin}
   Admin Login Required..<br>
  <a href="/DesignComp"><button>Goto enter token</button></a>
{:else}
<slot />    
{/if}