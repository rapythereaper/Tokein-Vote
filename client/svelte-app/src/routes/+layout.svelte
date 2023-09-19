<script>
  import "../app.postcss";
  /** @type {import('./$types').LayoutData} */
  // export let data;
  import { Loading as UserLoading, AUTH_STATE_LISTENER } from "../stores/Auth";
  import { slide,fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import Loading from "../lib/components/Loading.svelte";
  AUTH_STATE_LISTENER();
</script>

<!-- ACIT -->

{#if $UserLoading}
  <Loading withContainer={true}/>
{:else}
<div transition:fly={{ delay: 250, duration: 1000*3, x: 0, y: 500, opacity: 0.5, easing: quintOut }}>
  <slot/>
</div>
{/if}
