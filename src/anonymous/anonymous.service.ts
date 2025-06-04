import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AnonymousService {
  constructor(private jwtService: JwtService) {}

  register(dto: RegisterDto) {
    return 'This action adds a new anonymous';
  }

  login(dto: LoginDto) {
    const mockUser = {
      id: 1,
      email: 'test@gmail.com',
      password: '123456',
    };
    if (dto.email !== mockUser.email || dto.password !== mockUser.password) {
      return { error: 'Invalid credentials' };
    }

    const payload = {
      sub: mockUser.id,
      email: mockUser.email,
    };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
