<script lang="ts">
	import { page } from '$app/state';

	let { snippet = '' }: { snippet: string } = $props();

	const code = page.data.code?.[snippet] || '';
</script>

{#if code}
	<pre>{@render code?.()}</pre>
{:else}
	<pre><strong>Invalid Code Snippet: {snippet}</strong></pre>
{/if}

<style>
	:global(pre) {
		background-color: var(--color-background);
		border-radius: 0.5rem;
		padding: 1rem;
		margin: 1rem 0;
	}
</style>
