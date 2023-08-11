import { auth } from '$lib/firebase';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut as firebaseSignOut,
	onAuthStateChanged
} from 'firebase/auth';
import { writable } from 'svelte/store';

const googleProvider = new GoogleAuthProvider();

const userStore = () => {
	const user = writable(auth.currentUser, (set) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => set(user));

		return () => unsubscribe();
	});

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, googleProvider);
	};

	const signOut = async () => {
		await firebaseSignOut(auth);
	};

	return {
		subscribe: user.subscribe,
		signInWithGoogle,
		signOut
	};
};

export default userStore;
