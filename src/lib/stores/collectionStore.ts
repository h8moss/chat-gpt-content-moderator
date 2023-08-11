import { firestore } from '$lib/firebase';
import {
	type DocumentData,
	Query,
	QueryDocumentSnapshot,
	collection,
	onSnapshot,
	CollectionReference
} from 'firebase/firestore';
import { writable } from 'svelte/store';

type QueryBuilder = (col: CollectionReference) => Query;

const collectionStore = <T extends DocumentData>(
	path: string,
	queryBuilder: QueryBuilder = (col) => col
) => {
	const data = writable<{ data: T; id: string }[] | null>(null, (set) => {
		const unsubscribe = onSnapshot(queryBuilder(collection(firestore, path)), (sn) =>
			set(sn.docs.map((d) => ({ data: d.data() as T, id: d.id })))
		);

		return () => unsubscribe();
	});

	return {
		subscribe: data.subscribe
	};
};

export default collectionStore;
