import { Controller, Get, Body, Param, Patch, Delete, UseGuards ,Post} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dtos/update-product';
import { AuthGuard } from 'src/common/AuthGuards/auth.guard';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.productService.findAll();
  }
  
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productService.findById(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }
}
