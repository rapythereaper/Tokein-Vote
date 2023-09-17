<script>
    /** @type {import('./$types').LayoutData} */
   // export let data;
   import {Loading,AUTH_STATE_LISTENER} from "../stores/Auth"
   AUTH_STATE_LISTENER();
</script>
ACIT

{#if $Loading}
    Loading....
{:else}
    <slot />
{/if}
