<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { userStore } from '$lib/stores';
	import { Timestamp, addDoc, collection } from 'firebase/firestore';
	let user = userStore();

	let message = '';

	$: signedIn = !!$user;

	const submitMessage = async () => {
		if ($user) {
			await addDoc(collection(firestore, '/messages'), {
				author: $user.uid,
				author_name: $user.displayName,
				posted_at: Timestamp.now(),
				text: message
			});
			message = '';
		}
	};
</script>

{#if signedIn}
	<form on:submit={submitMessage} class="flex border-t-zinc-300 border-t-2 p-1 bg-white">
		<input
			class="flex-1 bg-zinc-200 p-2 ml-2 rounded-l-2xl"
			placeholder="Say something!"
			bind:value={message}
			on:submit={submitMessage}
		/>
		<button class="bg-blue-500 text-white p-2 rounded-r-2xl"> Send </button>
	</form>
{:else}
	<p>
		To chat, please
		<button class="text-blue-500 underline" on:click={() => user.signInWithGoogle()}>
			sign in with google
		</button>
	</p>
{/if}
