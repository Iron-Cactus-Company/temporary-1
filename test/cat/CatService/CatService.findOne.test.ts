import { CreateCatDto } from "src/cat/dto/create-cat.dto";
import {CatsService} from "../../../src/cat/cats.service";


describe('CatsService - findOne', () => {
  let service: CatsService;

  beforeEach(() => {
    service = new CatsService();
  });

  it('should return the correct cat by index', () => {
    const cat1: CreateCatDto = { name: 'Oscar', age: 6, breed: 'Birman' };
    const cat2: CreateCatDto = { name: 'Chloe', age: 3, breed: 'Abyssinian' };

    service.create(cat1);
    service.create(cat2);

    expect(service.findOne(0)).toEqual(cat1);
    expect(service.findOne(1)).toEqual(cat2);
  });

  it('should return undefined if index is out of bounds', () => {
    const result = service.findOne(10);
    expect(result).toBeUndefined();
  });

  it('should return undefined if index is negative', () => {
    const result = service.findOne(-1);
    expect(result).toBeUndefined();
  });

  it('should return undefined if list is empty', () => {
    expect(service.findOne(0)).toBeUndefined();
  });

  it('should not mutate the array', () => {
    const cat: CreateCatDto = { name: 'Mocha', age: 2, breed: 'Ragdoll' };
    service.create(cat);

    const original = [...(service as any).cats];
    service.findOne(0);
    expect((service as any).cats).toEqual(original);
  });
});
