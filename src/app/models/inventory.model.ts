import { User } from "./user.model";

export class Inventory {
  id: number | undefined;
  name: string | undefined;
  user: User | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
