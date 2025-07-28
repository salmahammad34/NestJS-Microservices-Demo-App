import { Controller, Get, Param, Put, Body, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { updateOrderDto } from './dtos/update-order.dto';
import { AuthGuard } from 'src/common/AuthGuards/auth.guard';


@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':userId')
  async findAll( @Param()userId:string) {
    return await this.orderService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findById(Number(id));
  }

  /**
   * Upsert ---->>> Update if exists, else create
   */
  @Put(':id')
  async creatOrUpdateOrder(
    @Param('id') id: string,
    @Body() data: CreateOrderDto | updateOrderDto
  ) {
    return await this.orderService.save(Number(id),data as CreateOrderDto, data as updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.orderService.delete(id);
  }
}
