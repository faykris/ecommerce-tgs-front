import { User } from "./user.model";

export class Order {
  id: number | undefined;
  user: User | undefined;
  description: string | undefined;
  quantity: number | undefined;
  discount: number | undefined;
  total: number | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
