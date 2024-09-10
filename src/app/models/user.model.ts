export class User {
  id: number | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  password: string | undefined;
  roles: { id: string; name: 'ADMIN' | 'USER' }[] | undefined;
  username: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
