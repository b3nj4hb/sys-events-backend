import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from './is-unique-constraint';

// decorator options interface
export type IsUniqueInterface = {
	tableName: string;
	column: string;
};

// decorator function
export function IsUnique(options: IsUniqueInterface, validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isUnique',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [options],
			validator: IsUniqueConstraint,
		});
	};
}
