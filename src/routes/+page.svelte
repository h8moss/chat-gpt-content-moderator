<script lang="ts">
	import MessageInput from '$lib/components/MessageInput.svelte';
	import MessageView from '$lib/components/MessageView.svelte';
	import { firestore } from '$lib/firebase';
	import { collectionStore, userStore } from '$lib/stores';
	import type { Message } from '$lib/types';
	import { orderBy, query } from 'firebase/firestore';

	const messages = collectionStore<Message>('/messages', (col) =>
		query(col, orderBy('posted_at', 'desc'))
	);
	const user = userStore();
</script>

<div class="flex flex-col w-screen h-screen overflow-x-hidden">
	<div class="flex bg-blue-500 justify-between text-white p-2">
		<p class="my-auto">{$user?.displayName || ''}</p>
		<button on:click={() => ($user ? user.signOut() : user.signInWithGoogle())}
			>{$user ? 'Sign out' : 'Sign in with google'}</button
		>
	</div>
	<div class="flex-1 flex flex-col-reverse p-2">
		{#if $messages}
			{#each $messages as message (message.id)}
				<MessageView {message} user={$user} />
			{/each}
		{/if}
	</div>
	<MessageInput />
</div>
