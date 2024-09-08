import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions, isUUID } from 'class-validator';
import { RoleEntity } from 'src/modules/profile/entities/role.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsStudentRequiredConstraint implements ValidatorConstraintInterface {
	constructor(
		@InjectRepository(RoleEntity)
		private roleRepository: Repository<RoleEntity>, // Inyectamos el repositorio de RoleEntity
	) {}

	// Validación que comprueba si el rol es "student" basado en el roleId
	async validate(fieldValue: any, args: ValidationArguments): Promise<boolean> {
		const roleId = (args.object as any).roleId;

		if (!roleId) {
			// Si no hay roleId, no podemos hacer la validación
			return true; // Permitir pasar si no hay roleId
		}

		// Consultamos el rol basado en el roleId
		const role = await this.roleRepository.findOne({ where: { id: roleId } });

		if (role && role.name.toLowerCase() === 'estudiante') {
			// Si el rol es "student", el campo (profileId, carrierId, cycleId) debe estar presente
			return fieldValue !== undefined && fieldValue !== null && isUUID(fieldValue);
		}

		// Si el rol no es "student", permitimos que los campos sean opcionales
		return true;
	}

	defaultMessage(args: ValidationArguments) {
		return `${args.property} is required when the role is student and must be UUID`;
	}
}

export function IsStudentRequired(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsStudentRequiredConstraint,
		});
	};
}
