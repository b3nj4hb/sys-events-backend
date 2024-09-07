export const studentWithEventsExample = [
	{
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
		studentEvent: [
			{
				assistante: true,
				event: {
					name: 'Activate Sistemas',
					date: '2024-04-12',
					hour: '10:00:00',
					location: 'Canchas sintéticas de la UPeU',
					period: '2024-1',
					fileUrl: null,
					eventType: {
						name: 'Actívate',
					},
				},
			},
			{
				assistante: false,
				event: {
					name: 'Cultura FIA',
					date: '2024-06-12',
					hour: '14:00:00',
					location: 'Auditorio Principal',
					period: '2024-1',
					fileUrl: null,
					eventType: {
						name: 'Cultura',
					},
				},
			},
		],
		cycle: {
			name: 'I',
		},
	},
];
