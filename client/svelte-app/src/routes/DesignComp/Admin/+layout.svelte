<script>
    /** @type {import('./$types').LayoutData} */
    import {User} from "../../../stores/Auth"
</script>

{#if !$User || !$User.__token__.isAdmin}
  <h1 class="text-5xl font-bold">Admin </h1>
  <p class="py-6">Admin login required to ascess this page <span class="text-5xl font-bold">🔐</span></p>
  <a href="/DesignComp"><button class="btn btn-primary">Go Back</button></a>
{:else}
<slot />    
{/if}