import {CatsService} from "../../../src/cat/cats.service";
import {CreateCatDto} from "../../../src/cat/dto/create-cat.dto";


describe('CatsService - create', () => {
  let service: CatsService;

  beforeEach(() => {
    service = new CatsService();
  });

  it('should add a cat to the list and return it', () => {
    const cat: CreateCatDto = { name: 'Whiskers', age: 2, breed: 'Tabby' };
    const result = service.create(cat);

    expect(result).toEqual(cat);
    expect((service as any).cats.length).toBe(1);
    expect((service as any).cats[0]).toEqual(cat);
  });

  it('should be able to add multiple cats', () => {
    const cat1: CreateCatDto = { name: 'Milo', age: 4, breed: 'Bengal' };
    const cat2: CreateCatDto = { name: 'Luna', age: 1, breed: 'Persian' };

    service.create(cat1);
    service.create(cat2);

    expect((service as any).cats.length).toBe(2);
    expect((service as any).cats[1]).toEqual(cat2);
  });

  it('should store cats in insertion order', () => {
    const cats: CreateCatDto[] = [
      { name: 'Alpha', age: 3, breed: 'Sphynx' },
      { name: 'Beta', age: 2, breed: 'Russian Blue' },
    ];

    cats.forEach(cat => service.create(cat));

    expect((service as any).cats).toEqual(cats);
  });
});
