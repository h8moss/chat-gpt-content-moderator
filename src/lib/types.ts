import type { Timestamp } from 'firebase/firestore';

export type Message = {
	text: string;
	author: string;
	author_name: string;
	posted_at: Timestamp;
};
