import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Concert } from './concert.entity';
import { ObjectId } from 'mongodb';

describe('ConcertService', () => {
  let service: ConcertService;
  let repository: Repository<Concert>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
    repository = module.get<Repository<Concert>>(getRepositoryToken(Concert));
  });

  it('should create a concert', async () => {
    const concertData = { name: 'Test Concert', description: 'Test Description', totalSeats: 100 };
    
    const createdConcert = new Concert();
    Object.assign(createdConcert, concertData);

    jest.spyOn(repository, 'create').mockReturnValue(createdConcert);
    jest.spyOn(repository, 'save').mockResolvedValue(createdConcert);

    const result = await service.createConcert(concertData);

    expect(result).toEqual(createdConcert);
  });
  
  it('should delete a concert', async () => {
    const concertId = 1;
  
    const deleteResult = { raw: '', affected: 1 };
  
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
  
    await expect(service.deleteConcert(concertId)).resolves.not.toThrow();
  });
  
  it('should reserve a seat for a concert', async () => {
    const concertId = new ObjectId();
    const userId = 'user123';
  
    const concert = new Concert();
    concert.totalSeats = 10;
    concert.reservedSeats = 0;
    concert.reservedBy = [];
  
    jest.spyOn(repository, 'findOne').mockResolvedValue(concert);
    jest.spyOn(repository, 'save').mockResolvedValue(concert as DeepPartial<Concert> & Concert);
  
    const result = await service.reserveSeat(concertId, userId);
  
    expect(result.reservedSeats).toEqual(1);
    expect(result.reservedBy).toContain(userId);
  });
  
  it('should cancel a seat reservation for a concert', async () => {
    const concertId = new ObjectId();
    const userId = 'user123';
  
    const concert = new Concert();
    concert.reservedSeats = 1;
    concert.numberOfCancels = 0;
    concert.reservedBy = [userId];
  
    jest.spyOn(repository, 'findOne').mockResolvedValue(concert);
    jest.spyOn(repository, 'save').mockResolvedValue(concert as DeepPartial<Concert> & Concert);
  
    await service.cancelSeat(concertId, userId);
  
    expect(concert.reservedSeats).toEqual(0);
    expect(concert.numberOfCancels).toEqual(1);
    expect(concert.reservedBy).not.toContain(userId);
  });
});