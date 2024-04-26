import React, { useState } from 'react';

interface ConcertCreateProps {
  onCreate: () => void
}

function ConcertCreate({ onCreate }: ConcertCreateProps) {
  const [concertName, setConcertName] = useState('');
  const [totalSeats, setTotalSeats] = useState<number>(500);
  const [description, setDescription] = useState('');

  const handleCreateConcert = async () => {

  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-blue-custom text-3xl font-semibold mb-4 border-b-2 pb-4">Create New Concert</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* concert name */}
        <div className="mb-4">
          <label htmlFor="concertName" className="block text-gray-700 font-semibold mb-2">Concert Name</label>
          <input type="text" id="concertName" placeholder="Please input concert name" className="block w-full p-2 border border-gray-500 rounded-md shadow-sm" value={concertName} onChange={(e) => setConcertName(e.target.value)} />
        </div>
        {/* total seats */}
        <div className="mb-4">
          <label htmlFor="totalSeats" className="block text-gray-700 font-semibold mb-2">Total of Seats</label>
          <input type="number" id="totalSeats" placeholder="500" className="block w-full p-2 border border-gray-500 rounded-md shadow-sm" value={totalSeats} onChange={(e) => setTotalSeats(isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10))} />
        </div>
      </div>
      {/* concert description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea id="description" placeholder="Please input description" className="block w-full p-2 border border-gray-500 rounded-md shadow-sm" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-blue-custom text-white px-4 py-2 rounded-sm shadow-sm hover:bg-blue-700 flex items-center" onClick={handleCreateConcert}>
          <svg className="h-5 w-5 mr-1" id="Layer_1" version="1.1" viewBox="0 0 30 30">
            <path fill="#ffffff" d="M22,4h-2v6c0,0.552-0.448,1-1,1h-9c-0.552,0-1-0.448-1-1V4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18  c1.105,0,2-0.895,2-2V8L22,4z M22,24H8v-6c0-1.105,0.895-2,2-2h10c1.105,0,2,0.895,2,2V24z" />
            <rect fill="#ffffff" height="5" width="2" x="16" y="4" />
          </svg>
          Save
        </button>
      </div>
    </div>
  );
}

export default ConcertCreate;