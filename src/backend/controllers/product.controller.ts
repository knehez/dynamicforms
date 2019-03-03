import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Product } from '../entities/product';

export default class ProductCtrl extends BaseCtrl {
    model = getRepository(Product);
}
