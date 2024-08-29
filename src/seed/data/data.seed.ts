const generateAvatarUrl = (fullName: string) => {
	const [firstName, lastName] = fullName.split(' ');
	return `https://ui-avatars.com/api/?size=225&name=${encodeURIComponent(firstName + '+' + lastName)}`;
};

export const seedData = {
	roles: [{ name: 'Estudiante' }, { name: 'Profesor' }],
	faculties: [
		{ name: 'Ciencias Empresariales' },
		{ name: 'Ciencias Humanas y Educación' },
		{ name: 'Ingeniería y Arquitectura' },
		{ name: 'Ciencias de la Salud' },
	],
	cycles: [
		{ name: 'I' },
		{ name: 'II' },
		{ name: 'III' },
		{ name: 'IV' },
		{ name: 'V' },
		{ name: 'VI' },
		{ name: 'VII' },
		{ name: 'VIII' },
		{ name: 'IX' },
		{ name: 'X' },
	],
	eventTypes: [{ name: 'Cultura' }, { name: 'Actívate' }],
	carriers: [
		{
			name: 'Ingeniería de Sistemas',
			facultyName: 'Ingeniería y Arquitectura',
		},
		{ name: 'Psicología', facultyName: 'Ciencias Humanas y Educación' },
	],
	events: [
		{
			name: 'Activate Sistemas',
			date: '2024-04-12',
			hour: '10:00:00',
			location: 'Canchas sintéticas de la UPeU',
			period: '2024-1',
			eventTypeName: 'Actívate',
		},
		{
			name: 'Cultura FIA',
			date: '2024-06-12',
			hour: '14:00:00',
			location: 'Auditorio Principal',
			period: '2024-1',
			eventTypeName: 'Cultura',
		},
		{
			name: 'Activate Sistemas',
			date: '2024-08-09',
			hour: '10:00:00',
			location: 'Lozas de la UPeU',
			period: '2024-2',
			eventTypeName: 'Actívate',
		},
		{
			name: 'Cultura FIA',
			date: '2024-08-10',
			hour: '10:00:00',
			location: 'Auditorio Movil',
			period: '2024-2',
			eventTypeName: 'Cultura',
		},
		{
			name: 'Activate FIA',
			date: '2024-08-12',
			hour: '10:00:00',
			location: 'Auditorio Movil',
			period: '2024-2',
			eventTypeName: 'Actívate',
		},
	],
	profiles: [
		{
			fullName: 'Juan Solis Barreto',
			avatarUrl: generateAvatarUrl('Juan Solis Barreto'),
			roleName: 'Estudiante',
			code: '202098765',
			phone: '987654321',
			email: 'juan.solis@upeu.edu.pe',
			password: '$2y$10$NWwGCDDWstyl2LKimBf.POrH3SGOo58Hsb4qQ65xNQWVywgE6Yswi',
		},
		{
			fullName: 'Mario Rodriguez Lopez',
			avatarUrl: generateAvatarUrl('Mario Rodriguez Lopez'),
			roleName: 'Estudiante',
			code: '202187654',
			phone: '987123456',
			email: 'mario.rodriguez@upeu.edu.pe',
			password: '$2y$10$NWwGCDDWstyl2LKimBf.POrH3SGOo58Hsb4qQ65xNQWVywgE6Yswi',
		},
		{
			fullName: 'Carlos Mendoza Huaman',
			avatarUrl: generateAvatarUrl('Carlos Mendoza Huaman'),
			roleName: 'Estudiante',
			code: '201976543',
			phone: '976543210',
			email: 'carlos.mendoza@upeu.edu.pe',
			password: '$2y$10$NWwGCDDWstyl2LKimBf.POrH3SGOo58Hsb4qQ65xNQWVywgE6Yswi',
		},
		{
			fullName: 'Anibal Torres Quispe',
			avatarUrl: generateAvatarUrl('Anibal Torres Quispe'),
			roleName: 'Estudiante',
			code: '202265432',
			phone: '965432109',
			email: 'anibal.torres@upeu.edu.pe',
			password: '$2y$10$NWwGCDDWstyl2LKimBf.POrH3SGOo58Hsb4qQ65xNQWVywgE6Yswi',
		},
		{
			fullName: 'Pedro Mamani Flores',
			avatarUrl: generateAvatarUrl('Pedro Mamani Flores'),
			roleName: 'Estudiante',
			code: '202054321',
			phone: '954321098',
			email: 'pedro.mamani@upeu.edu.pe',
			password: '$2y$10$NWwGCDDWstyl2LKimBf.POrH3SGOo58Hsb4qQ65xNQWVywgE6Yswi',
		},
		{
			fullName: 'Julio Cespedes Flores',
			avatarUrl: generateAvatarUrl('Julio Cespedes Flores'),
			roleName: 'Estudiante',
			code: '202054381',
			phone: '967992832',
			email: 'julio.cespedes@upeu.edu.pe',
			password: '$2y$10$NWwGCDDWstyl2LKimBf.POrH3SGOo58Hsb4qQ65xNQWVywgE6Yswi',
		},
		{
			fullName: 'Fernando Manuel Asin Gomez',
			avatarUrl: generateAvatarUrl('Fernando Manuel Asin Gomez'),
			roleName: 'Profesor',
			code: '200209322',
			phone: '975567567',
			email: 'fernando.asin@upeu.edu.pe',
			password: '$2y$10$NWwGCDDWstyl2LKimBf.POrH3SGOo58Hsb4qQ65xNQWVywgE6Yswi',
		},
	],
	students: [
		{
			profileCode: '202098765',
			carrierName: 'Ingeniería de Sistemas',
			cycleName: 'I',
		},
		{
			profileCode: '202187654',
			carrierName: 'Psicología',
			cycleName: 'II',
		},
		{
			profileCode: '201976543',
			carrierName: 'Ingeniería de Sistemas',
			cycleName: 'III',
		},
		{
			profileCode: '202265432',
			carrierName: 'Psicología',
			cycleName: 'IV',
		},
		{
			profileCode: '202054321',
			carrierName: 'Ingeniería de Sistemas',
			cycleName: 'V',
		},
		{
			profileCode: '202054381',
			carrierName: 'Psicología',
			cycleName: 'VI',
		},
		{
			profileCode: '200209322',
			carrierName: 'Ingeniería de Sistemas',
			cycleName: 'VII',
		},
	],
	studentEvents: [
		// Juan Solis Barreto
		{
			assistante: true,
			eventName: 'Activate Sistemas',
			location: 'Canchas sintéticas de la UPeU',
			date: '2024-04-12',
			hour: '10:00:00',
			studentProfileCode: '202098765',
		},
		{
			assistante: false,
			eventName: 'Cultura FIA',
			location: 'Auditorio Principal',
			date: '2024-06-12',
			hour: '14:00:00',
			studentProfileCode: '202098765',
		},
		{
			assistante: true,
			eventName: 'Activate Sistemas',
			location: 'Lozas de la UPeU',
			date: '2024-08-09',
			hour: '10:00:00',
			studentProfileCode: '202098765',
		},
		{
			assistante: false,
			eventName: 'Cultura FIA',
			location: 'Auditorio Movil',
			date: '2024-08-10',
			hour: '10:00:00',
			studentProfileCode: '202098765',
		},
		{
			assistante: true,
			eventName: 'Activate FIA',
			location: 'Auditorio Movil',
			date: '2024-08-12',
			hour: '10:00:00',
			studentProfileCode: '202098765',
		},

		// Mario Rodriguez Lopez
		{
			assistante: false,
			eventName: 'Activate Sistemas',
			location: 'Canchas sintéticas de la UPeU',
			date: '2024-04-12',
			hour: '10:00:00',
			studentProfileCode: '202187654',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Principal',
			date: '2024-06-12',
			hour: '14:00:00',
			studentProfileCode: '202187654',
		},
		{
			assistante: false,
			eventName: 'Activate Sistemas',
			location: 'Lozas de la UPeU',
			date: '2024-08-09',
			hour: '10:00:00',
			studentProfileCode: '202187654',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Movil',
			date: '2024-08-10',
			hour: '10:00:00',
			studentProfileCode: '202187654',
		},
		{
			assistante: false,
			eventName: 'Activate FIA',
			location: 'Auditorio Movil',
			date: '2024-08-12',
			hour: '10:00:00',
			studentProfileCode: '202187654',
		},

		// Carlos Mendoza Huaman
		{
			assistante: true,
			eventName: 'Activate Sistemas',
			location: 'Canchas sintéticas de la UPeU',
			date: '2024-04-12',
			hour: '10:00:00',
			studentProfileCode: '201976543',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Principal',
			date: '2024-06-12',
			hour: '14:00:00',
			studentProfileCode: '201976543',
		},
		{
			assistante: false,
			eventName: 'Activate Sistemas',
			location: 'Lozas de la UPeU',
			date: '2024-08-09',
			hour: '10:00:00',
			studentProfileCode: '201976543',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Movil',
			date: '2024-08-10',
			hour: '10:00:00',
			studentProfileCode: '201976543',
		},
		{
			assistante: false,
			eventName: 'Activate FIA',
			location: 'Auditorio Movil',
			date: '2024-08-12',
			hour: '10:00:00',
			studentProfileCode: '201976543',
		},

		// Anibal Torres Quispe
		{
			assistante: false,
			eventName: 'Activate Sistemas',
			location: 'Canchas sintéticas de la UPeU',
			date: '2024-04-12',
			hour: '10:00:00',
			studentProfileCode: '202265432',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Principal',
			date: '2024-06-12',
			hour: '14:00:00',
			studentProfileCode: '202265432',
		},
		{
			assistante: true,
			eventName: 'Activate Sistemas',
			location: 'Lozas de la UPeU',
			date: '2024-08-09',
			hour: '10:00:00',
			studentProfileCode: '202265432',
		},
		{
			assistante: false,
			eventName: 'Cultura FIA',
			location: 'Auditorio Movil',
			date: '2024-08-10',
			hour: '10:00:00',
			studentProfileCode: '202265432',
		},
		{
			assistante: true,
			eventName: 'Activate FIA',
			location: 'Auditorio Movil',
			date: '2024-08-12',
			hour: '10:00:00',
			studentProfileCode: '202265432',
		},

		// Pedro Mamani Flores
		{
			assistante: true,
			eventName: 'Activate Sistemas',
			location: 'Canchas sintéticas de la UPeU',
			date: '2024-04-12',
			hour: '10:00:00',
			studentProfileCode: '202054321',
		},
		{
			assistante: false,
			eventName: 'Cultura FIA',
			location: 'Auditorio Principal',
			date: '2024-06-12',
			hour: '14:00:00',
			studentProfileCode: '202054321',
		},
		{
			assistante: true,
			eventName: 'Activate Sistemas',
			location: 'Lozas de la UPeU',
			date: '2024-08-09',
			hour: '10:00:00',
			studentProfileCode: '202054321',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Movil',
			date: '2024-08-10',
			hour: '10:00:00',
			studentProfileCode: '202054321',
		},
		{
			assistante: false,
			eventName: 'Activate FIA',
			location: 'Auditorio Movil',
			date: '2024-08-12',
			hour: '10:00:00',
			studentProfileCode: '202054321',
		},

		// Julio Cespedes Flores
		{
			assistante: false,
			eventName: 'Activate Sistemas',
			location: 'Canchas sintéticas de la UPeU',
			date: '2024-04-12',
			hour: '10:00:00',
			studentProfileCode: '202054381',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Principal',
			date: '2024-06-12',
			hour: '14:00:00',
			studentProfileCode: '202054381',
		},
		{
			assistante: false,
			eventName: 'Activate Sistemas',
			location: 'Lozas de la UPeU',
			date: '2024-08-09',
			hour: '10:00:00',
			studentProfileCode: '202054381',
		},
		{
			assistante: true,
			eventName: 'Cultura FIA',
			location: 'Auditorio Movil',
			date: '2024-08-10',
			hour: '10:00:00',
			studentProfileCode: '202054381',
		},
		{
			assistante: true,
			eventName: 'Activate FIA',
			location: 'Auditorio Movil',
			date: '2024-08-12',
			hour: '10:00:00',
			studentProfileCode: '202054381',
		},
	],
};
