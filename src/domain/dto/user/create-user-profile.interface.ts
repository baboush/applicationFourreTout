import { Name, Surname } from '@shared/types';

export interface CreateUserProfile {
  readonly name: Name;
  readonly surname: Surname;
}
