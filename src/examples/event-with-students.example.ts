export const eventWithStudentsExample = [
	{
		id: 'e3595f9f-b3e9-4cc8-9ce4-caf66c4e725c',
		name: 'Activate Sistemas',
		date: '2024-04-12',
		hour: '10:00:00',
		location: 'Canchas sintéticas de la UPeU',
		period: '2024-1',
		fileUrl: null,
		eventType: {
			name: 'Actívate',
		},
		studentEvent: [
			{
				assistante: true,
				student: {
					id: 'ffe8d68e-ae86-4de6-a638-71005c0e3277',
					profile: {
						id: '7ad1ecd2-d821-45d4-ac00-2c68faa93c63',
						fullName: 'Juan Solis Barreto',
						avatarUrl: 'https://ui-avatars.com/api/?size=225&name=Juan%2BSolis',
						code: '202098765',
						phone: '987654321',
						email: 'juan.solis@upeu.edu.pe',
						role: {
							name: 'Estudiante',
						},
					},
					carrier: {
						name: 'Ingeniería de Sistemas',
						faculty: {
							name: 'Ingeniería y Arquitectura',
						},
					},
					cycle: {
						name: 'I',
					},
				},
			},
			{
				assistante: false,
				student: {
					id: 'e385209b-1ff5-45a3-ae47-02969fbc91a0',
					profile: {
						id: '993d8f4f-38d9-464d-a76b-82ef52b72658',
						fullName: 'Mario Rodriguez Lopez',
						avatarUrl: 'https://ui-avatars.com/api/?size=225&name=Mario%2BRodriguez',
						code: '202187654',
						phone: '987123456',
						email: 'mario.rodriguez@upeu.edu.pe',
						role: {
							name: 'Estudiante',
						},
					},
					carrier: {
						name: 'Psicología',
						faculty: {
							name: 'Ciencias Humanas y Educación',
						},
					},
					cycle: {
						name: 'II',
					},
				},
			},
		],
	},
];
