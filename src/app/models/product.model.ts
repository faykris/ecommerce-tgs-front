import { Inventory } from "./inventory.model";
import { Order } from "./order.model";

export class Product {
  id: number = 0;
  productCode: string | undefined;
  category: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  status: number | undefined;
  inventory: Inventory | undefined;
  order: Order | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
