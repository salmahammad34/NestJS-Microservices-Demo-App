import { Expose, Exclude, Type } from 'class-transformer';
import { User } from '@prisma/client'; 

@Exclude()
export class OrderEntity {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  productId: number;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => Object) 
  user: User;
}
