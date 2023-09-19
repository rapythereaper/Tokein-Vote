<script>
    export let withContainer=false;
    import { fade } from 'svelte/transition';
</script>
<div transition:fade={{ delay: 0, duration: 500 }}>
    {#if withContainer}
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">Loading..</h1>
                <p class="py-6"></p>
                <span class="loading loading-spinner text-secondary loading-lg"></span>
            </div>
            </div>
        </div>
    {:else}
        <h1 class="text-5xl font-bold">Loading..</h1>
        <p class="py-6"></p>    
        <span class="loading loading-spinner text-secondary loading-lg"></span>
    {/if}
</div>
