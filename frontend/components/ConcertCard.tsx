import React from 'react';

interface ConcertCardProps {
    name: string;
    description: string;
    totalSeats: number;
    reservedSeats: number;
    onDelete: (name: string) => void
}

function ConcertCard({ name, description, totalSeats, reservedSeats, onDelete }: ConcertCardProps) {
    const confirmConcertDelete = () => {
        onDelete(name);
    }
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
                <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 flex items-center" onClick={confirmConcertDelete}>
                    <svg className="h-5 w-5 mr-1" enable-background="new 0 0 32 32" id="Layer_1" version="1.1" viewBox="0 0 32 32" ><g id="trash"><path clip-rule="evenodd" d="M29.98,6.819c-0.096-1.57-1.387-2.816-2.98-2.816h-3v-1V3.001   c0-1.657-1.344-3-3-3H11c-1.657,0-3,1.343-3,3v0.001v1H5c-1.595,0-2.885,1.246-2.981,2.816H2v1.183v1c0,1.104,0.896,2,2,2l0,0v17   c0,2.209,1.791,4,4,4h16c2.209,0,4-1.791,4-4v-17l0,0c1.104,0,2-0.896,2-2v-1V6.819H29.98z M10,3.002c0-0.553,0.447-1,1-1h10   c0.553,0,1,0.447,1,1v1H10V3.002z M26,28.002c0,1.102-0.898,2-2,2H8c-1.103,0-2-0.898-2-2v-17h20V28.002z M28,8.001v1H4v-1V7.002   c0-0.553,0.447-1,1-1h22c0.553,0,1,0.447,1,1V8.001z" fill="#ffffff" fill-rule="evenodd" /><path clip-rule="evenodd" d="M9,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1H9   c-0.553,0-1,0.447-1,1v13C8,27.559,8.447,28.006,9,28.006z M9,14.005h2v13H9V14.005z" fill="#ffffff" fill-rule="evenodd" /><path clip-rule="evenodd" d="M15,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1h-2   c-0.553,0-1,0.447-1,1v13C14,27.559,14.447,28.006,15,28.006z M15,14.005h2v13h-2V14.005z" fill="#ffffff" fill-rule="evenodd" /><path clip-rule="evenodd" d="M21,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1h-2   c-0.553,0-1,0.447-1,1v13C20,27.559,20.447,28.006,21,28.006z M21,14.005h2v13h-2V14.005z" fill="#ffffff" fill-rule="evenodd" /></g></svg>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ConcertCard;