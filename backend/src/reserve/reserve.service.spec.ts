import { Test, TestingModule } from '@nestjs/testing';
import { ReserveService } from './reserve.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservationAction, Reserve } from './reserve.entity';
import { ConcertService } from '../concert/concert.service';
import { ObjectId } from 'mongodb';

describe('ReserveService', () => {
  let service: ReserveService;
  let concertService: ConcertService;

  const mockReserveRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockConcertService = {
    getConcertById: jest.fn(),
    reserveSeat: jest.fn(),
    cancelSeat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReserveService,
        { provide: getRepositoryToken(Reserve), useValue: mockReserveRepository },
        { provide: ConcertService, useValue: mockConcertService },
      ],
    }).compile();

    service = module.get
      (ReserveService);
    concertService = module.get(ConcertService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('reserve', () => {
    it('should reserve a seat', async () => {
      // Mock the necessary functions from concertService
      
      const concertId = new ObjectId();
      const userId = 'user123';
      const concertName = 'Concert Name';
      const username = 'Username';
      const mockConcert = {
        _id: concertId,
        name: 'Mock Concert',
        description: 'Mock Concert Description',
        totalSeats: 100,
        reservedSeats: 0,
        numberOfCancels: 0,
        reservedBy: [],
        createDate: new Date()
      };
      mockConcertService.getConcertById.mockResolvedValue(mockConcert);
      mockConcertService.reserveSeat.mockResolvedValue(undefined);
      mockReserveRepository.create.mockReturnValue({});
      mockReserveRepository.save.mockReturnValue({});

      await service.reserve(username,  userId,  concertId,  concertName);

      expect(mockConcertService.getConcertById).toHaveBeenCalledWith(concertId);
      expect(mockConcertService.reserveSeat).toHaveBeenCalledWith(concertId, userId);
      expect(mockReserveRepository.create).toHaveBeenCalledWith({
        username,
        userId,
        action: ReservationAction.RESERVE,
        concertId,
        concertName,
      });
      expect(mockReserveRepository.save).toHaveBeenCalled();
    });
  });

});