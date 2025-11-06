import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../users/enum/roles.enum';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles)
