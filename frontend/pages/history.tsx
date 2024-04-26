import React, { useEffect, useState } from 'react';

interface HistoryProps {
  isAdmin: boolean;
}

interface ReservationProps {
  createDate: string;
  username: string;
  concertName: number;
  action: number;
}

export default function History({ isAdmin }: HistoryProps) {
  const [reservations, setReservations] = useState<ReservationProps[]>([]);

  useEffect(() => {
    const role = isAdmin ? 'admin' : 'user';
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:';
    const URL = process.env.NEXT_PUBLIC_PORT || '8080';

    fetch(`${BASE_URL}${URL}/reserve/admin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'role': role
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setReservations(data);
      })
      .catch(error => console.error('There was a problem with the request:', error));
  }, []);

  return (
    <div className="pl-4 sm:pl-64 py-12 pr-4">
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-black border-opacity-100 w-full">
          <thead>
            <tr className="bg-transparent border border-black border-opacity-100">
              <th className="border border-black border-opacity-100 p-3 text-left">Date time</th>
              <th className="border border-black border-opacity-100 p-2 text-left">Username</th>
              <th className="border border-black border-opacity-100 p-2 text-left">Concert Name</th>
              <th className="border border-black border-opacity-100 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations && reservations.map((reservation, index) => (
              <tr key={index} className="bg-transparent border border-black border-opacity-100">
                <td className="border border-black border-opacity-100 p-2 text-left">
                  {new Date(reservation.createDate).toLocaleString()}
                </td>
                <td className="border border-black border-opacity-100 p-2 text-left">{reservation.username}</td>
                <td className="border border-black border-opacity-100 p-2 text-left">{reservation.concertName}</td>
                <td className="border border-black border-opacity-100 p-2 text-left">{reservation.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
