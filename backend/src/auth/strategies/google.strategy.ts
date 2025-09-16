import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { Role } from '../rbac/roles.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENT_ID') || configService.get('GOOGLE_CLIENT_ID') || 'placeholder-client-id',
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET') || configService.get('GOOGLE_CLIENT_SECRET') || 'placeholder-client-secret',
      callbackURL: configService.get('GOOGLE_AUTH_REDIRECT_URI') || configService.get('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    return this.usersService.getOrCreateUser({
      email: profile.emails[0]?.value,
      password: '',
      name: profile.displayName || profile.name?.givenName + ' ' + profile.name?.familyName || 'Google User',
      role: Role.COACHEE, // Default role for Google OAuth users
    });
  }
}
