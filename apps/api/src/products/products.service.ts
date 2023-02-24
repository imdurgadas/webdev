import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  products = [
    {
      id: 1,
      amount: 250,
      image: 'https://m.media-amazon.com/images/I/4125d5RJ+zL.jpg',
    },
    {
      id: 2,
      amount: 655,
      image:
        'https://m.media-amazon.com/images/I/61N2a92STML._AC_UL480_FMwebp_QL65_.jpg',
    },
  ];

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
