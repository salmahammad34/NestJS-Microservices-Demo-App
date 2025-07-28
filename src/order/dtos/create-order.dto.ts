import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
  @IsOptional()
  id?:number
  @IsInt()
  userId: number;

  @IsInt()
  productId: number;

  @IsOptional()
  @IsString()
  status?: string;
}
