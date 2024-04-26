import React from 'react';

interface ConcertCardProps {
    name: string;
    id: string;
    description: string;
    totalSeats: number;
    reservedSeats: number;
    isReserved: boolean;
    onAction: () => void
}

function ConcertCard({ name, id, description, totalSeats, reservedSeats, isReserved, onAction }: ConcertCardProps) {
    const handleReserve = async () => {
        const role = 'user';

        // use constant username and userId because demo no authentication
        const reserveData = {
            username: 'user12345',
            action: 'reserve',
            concertId: id,
            concertName: name,
            userId: 'user123',
          };
        fetch(`http://localhost:8080/reserve/reserve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'role': role
          },
          body: JSON.stringify(reserveData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            } else{
              onAction();
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error('There was a problem with the request:', error));
    };
    const handleCancel = async () => {
        const role = 'user';

        // use constant username and userId because demo no authentication
        const cancelData = {
            username: 'user12345',
            action: 'cancel',
            concertId: id,
            concertName: name,
            userId: 'user123',
          };
        fetch(`http://localhost:8080/reserve/cancel`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'role': role
          },
          body: JSON.stringify(cancelData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            } else{
              onAction();
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error('There was a problem with the request:', error));
    };
    return (
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
            <h2 className="text-blue-custom text-3xl font-semibold mb-4 border-b-2 pb-4">{name}</h2>
            <p className="text-black mb-4 min-h-20">{description}</p>
            <div className="flex justify-between items-center">
                <div className="text-black text-xl flex items-center">
                    <svg className="h-6 w-6 mr-1" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="Guide" /><g id="Layer_2"><g>
                        <path fill="#000000" d="M8,7c1.38,0,2.5-1.12,2.5-2.5S9.38,2,8,2S5.5,3.12,5.5,4.5S6.62,7,8,7z M8,3c0.83,0,1.5,0.67,1.5,1.5S8.83,6,8,6    S6.5,5.33,6.5,4.5S7.17,3,8,3z" />
                        <path fill="#000000" d="M9.71,7.5H6.29C4.47,7.5,3,9.07,3,10.99v2.51C3,13.78,3.22,14,3.5,14h9c0.28,0,0.5-0.22,0.5-0.5v-2.51    C13,9.07,11.53,7.5,9.71,7.5z M12,13H4v-2.01C4,9.62,5.03,8.5,6.29,8.5h3.43c1.26,0,2.29,1.12,2.29,2.49V13z" /></g></g>
                    </svg>
                    {reservedSeats} / {totalSeats}
                </div>
                {isReserved ? (
                    <button onClick={handleCancel} className="bg-red-500 text-white w-28 py-2 rounded-sm shadow-sm hover:bg-red-700 flex items-center text-lg justify-center">
                        Cancel
                    </button>
                ) : (
                    <button onClick={handleReserve} className="bg-blue-custom text-white w-28 py-2 rounded-sm shadow-sm hover:bg-red-700 flex items-center text-lg justify-center">
                        Reserve
                    </button>
                )}
            </div>
        </div>
    );
}

export default ConcertCard;