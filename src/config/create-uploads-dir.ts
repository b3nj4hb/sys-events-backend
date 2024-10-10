import { existsSync, mkdirSync } from 'fs';

export function createUploadsDir() {
	const uploadsDir = './uploads';
	if (!existsSync(uploadsDir)) {
		mkdirSync(uploadsDir);
		console.log(`Directory ${uploadsDir} created.`);
	} else {
		console.log(`Directory ${uploadsDir} already exists.`);
	}
}
