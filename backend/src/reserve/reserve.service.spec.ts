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

      await service.reserve(username, userId, concertId, concertName);

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

  describe('cancel', () => {
    it('should cancel a reservation and remove user from concert reservedBy list', async () => {
      const userId = 'user123';
      const concertId = new ObjectId();
      const concertName = 'Concert Name';
      const username = 'Username';

      const concert = { _id: concertId, reservedBy: [userId] };

      mockConcertService.getConcertById.mockResolvedValue(concert);
      mockConcertService.cancelSeat.mockResolvedValue(undefined);
      mockReserveRepository.create.mockReturnValue({});
      mockReserveRepository.save.mockReturnValue({});

      await service.cancel(username, userId, concertId, concertName);

      expect(mockConcertService.getConcertById).toHaveBeenCalledWith(concertId);
      expect(mockConcertService.cancelSeat).toHaveBeenCalledWith(concertId, userId);
      expect(mockReserveRepository.create).toHaveBeenCalledWith({
        username,
        userId,
        action: ReservationAction.CANCEL,
        concertId,
        concertName,
      });
      expect(mockReserveRepository.save).toHaveBeenCalled();
    });
  });

  describe('hasUserReserved', () => {
    it('should return true if user has reserved a concert', async () => {
      const userId = 'user123';
      const concertId = new ObjectId();

      const concert = { _id: concertId, reservedBy: [userId] };

      mockConcertService.getConcertById.mockResolvedValue(concert);

      const result = await service.hasUserReserved(userId, concertId);

      expect(result).toBe(true);
      expect(mockConcertService.getConcertById).toHaveBeenCalledWith(concertId);
    });

    it('should return false if user has not reserved a concert', async () => {
      const userId = 'user123';
      const concertId = new ObjectId();

      const concert = { _id: concertId, reservedBy: ['otherUser'] };

      mockConcertService.getConcertById.mockResolvedValue(concert);

      const result = await service.hasUserReserved(userId, concertId);

      expect(result).toBe(false);
      expect(mockConcertService.getConcertById).toHaveBeenCalledWith(concertId);
    });
  });
});