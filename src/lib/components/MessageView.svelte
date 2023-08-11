<script lang="ts">
	import type { Message } from '$lib/types';
	import type { User } from 'firebase/auth';

	export let user: User | null;
	export let message: { data: Message; id: string };

	$: isByCurrentUser = user !== null && user.uid === message.data.author;
</script>

<div class="w-full flex justify-start" class:by-current-user={isByCurrentUser}>
	<div class="my-2 flex flex-col max-w-[50%]">
		<p class="author">{message.data.author_name || 'Unknown'}</p>
		<div class="flex">
			<p class="message">
				{message.data.text}
			</p>
		</div>
	</div>
</div>

<style>
	p.author {
		@apply text-zinc-400;
	}

	p.message {
		@apply p-2 rounded-2xl bg-zinc-300;
		word-wrap: break-word;
	}

	div.by-current-user p.message {
		@apply text-white bg-blue-500;
	}

	div.by-current-user p.author {
		@apply text-right;
	}

	div.by-current-user {
		@apply justify-end;
	}
	div.by-current-user div {
		@apply justify-end;
	}
</style>
