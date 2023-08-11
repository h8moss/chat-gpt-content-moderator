// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD4whYxXiXVgWWdN8BTR6H7XJf-fVE1tuE',
	authDomain: 'chat-gpt-moderation.firebaseapp.com',
	projectId: 'chat-gpt-moderation',
	storageBucket: 'chat-gpt-moderation.appspot.com',
	messagingSenderId: '527663253399',
	appId: '1:527663253399:web:c7e40a713a747fe37c66d2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
