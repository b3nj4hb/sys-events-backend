export interface Profile {
	fullName: string;
	avatarUrl: string;
	code: string;
	phone: string;
	email: string;
	password: string;
	role: Role;
}
export enum Role {
	student = 'student',
	admin = 'admin',
	secretary = 'tutor',
}
