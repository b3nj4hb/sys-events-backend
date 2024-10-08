import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOperation({ summary: 'Authenticate user and return JWT token' })
	async login(@Body() user: AuthDto) {
		const validatedUser = await this.authService.validateUser(user);
		if (!validatedUser) {
			return { message: 'Credenciales incorrectas' };
		}
		return this.authService.login(validatedUser);
	}

	@Post('hash-password')
	@ApiOperation({ summary: 'Hash a password' })
	async hashPassword(@Body('password') password: string): Promise<{ hashedPassword: string }> {
		const hashedPassword = await this.authService.hashPassword(password);
		return { hashedPassword };
	}
}
