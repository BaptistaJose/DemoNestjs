import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/users/enum/roles.enum';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles)
