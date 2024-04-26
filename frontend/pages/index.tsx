import ConcertCard from "@/components/ConcertCard";
import ConcertCardUser from "@/components/ConcertCardUser";
import ConcertCreate from "@/components/ConcertCreate";
import { Modal } from "@/components/ConfirmModal";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

interface HomeProps {
  isAdmin: boolean;
}

interface ConcertProps {
  _id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
  isReserved: boolean;
}

export default function Home({ isAdmin }: HomeProps) {
  const [view, setView] = useState("overview");
  const [totalSeatCount, setTotalSeatCount] = useState(0);
  const [totalReserveCount, setTotalReserveCount] = useState(0);
  const [totalCancelCount, setTotalCancelCount] = useState(0);
  const [concerts, setConcerts] = useState<ConcertProps[]>();
  const [selectConcertId, setSelectConcertId] = useState<string>();
  const [selectConcertName, setSelectConcertName] = useState<string>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); //control create concert success msg
  const [showDeleteMessage, setShowDeleteMessage] = useState(false); //control create Delete success msg
  const [showReservationMessage, setShowReservationMessage] = useState(false); //control create reservation success msg
  const modalRef = useRef<HTMLDialogElement>(null)

  const fetchStats = async () => {
    const role = isAdmin ? 'admin' : 'user';
  
    try {
      const response = await fetch(`http://localhost:8080/concert/stats/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'role': role
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      
      //check the type before setting
      if (typeof data.data.totalSeats === 'number') {
        setTotalSeatCount(data.data.totalSeats);
      }
  
      if (typeof data.data.totalReservedSeats === 'number') {
        setTotalReserveCount(data.data.totalReservedSeats);
      }
  
      if (typeof data.data.totalCanceledSeats === 'number') {
        setTotalCancelCount(data.data.totalCanceledSeats);
      }
    } catch (error) {
      console.error('There was a problem with the request:', error);
    }
  };

  const fetchConcerts = async () => {
    const role = isAdmin ? 'admin' : 'user';
    // use constant userId because demo no authentication
    const userId = 'user123'
    fetch(`http://localhost:8080/concert/${userId}`, {
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
        setConcerts(data.data);
        console.log(data);
      })
      .catch(error => console.error('There was a problem with the request:', error));
  };

  // re-fetch concerts after created and set view to overview tab
  const handleCreateConcert = async () => {
    fetchConcerts();
    setView("overview");
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  }

  // re-fetch concerts after action 
  const handleReserveAction = async () => {
    fetchConcerts();
    setShowReservationMessage(true);
    setTimeout(() => {
      setShowReservationMessage(false);
    }, 3000);
  };

  // display the confirmation modal to delete slected concert
  const confirmConcertDelete = (concertId: string, concertName: string) => {
    setSelectConcertId(concertId);
    setSelectConcertName(concertName);
    modalRef?.current?.showModal();
  }

  // delete selected concert
  const handleDeleteConcert = async () => {
    const role = isAdmin ? 'admin' : 'user';
    fetch(`http://localhost:8080/concert/${selectConcertId}`, {
      method: 'DELETE',
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
        console.log(data);
        modalRef?.current?.close();
        fetchConcerts();
        setShowDeleteMessage(true);
        setTimeout(() => {
          setShowDeleteMessage(false);
        }, 3000);
      })
      .catch(error => console.error('There was a problem with the request:', error));
  };

  useEffect(() => {
    fetchConcerts();
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);
  return (
    <div className="sm:pl-64 pl-12 py-12 pr-12">

      {/* admin home page */}
      {isAdmin ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total seat */}
            <div className={`${styles.card} bg-sky-700 space-y-2 text-white shadow-md`}>
              <svg className="h-9 w-9" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="Guide" /><g id="Layer_2"><g>
                <path fill="#ffffff" d="M8,7c1.38,0,2.5-1.12,2.5-2.5S9.38,2,8,2S5.5,3.12,5.5,4.5S6.62,7,8,7z M8,3c0.83,0,1.5,0.67,1.5,1.5S8.83,6,8,6    S6.5,5.33,6.5,4.5S7.17,3,8,3z" />
                <path fill="#ffffff" d="M9.71,7.5H6.29C4.47,7.5,3,9.07,3,10.99v2.51C3,13.78,3.22,14,3.5,14h9c0.28,0,0.5-0.22,0.5-0.5v-2.51    C13,9.07,11.53,7.5,9.71,7.5z M12,13H4v-2.01C4,9.62,5.03,8.5,6.29,8.5h3.43c1.26,0,2.29,1.12,2.29,2.49V13z" /></g></g>
              </svg>
              <p className="text-center text-xl">Total of seats</p>
              <p className="text-center text-4xl py-2">{totalSeatCount}</p>
            </div>

            {/* Total reservation */}
            <div className={`${styles.card} bg-teal-600 space-y-2 text-white shadow-md`}>
              <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M16.2425 2.93179L21.0682 7.75756C22.3955 9.08482 22.0324 11.3223 20.3535 12.1618L15.4826 14.5972C15.3073 14.6849 15.1732 14.8378 15.1092 15.0232L13.6699 19.1894C13.3684 20.0621 12.2574 20.318 11.6045 19.6652L8.50002 16.5606L4.06074 21H3L3.00008 19.9393L7.43936 15.5L4.33487 12.3955C3.682 11.7426 3.93791 10.6316 4.81061 10.3301L8.97688 8.89087C9.16223 8.82684 9.31512 8.69278 9.40281 8.51739L11.8382 3.64651C12.6777 1.96763 14.9152 1.60453 16.2425 2.93179ZM20.0076 8.81822L15.1818 3.99245C14.5785 3.38915 13.5614 3.5542 13.1799 4.31732L10.7445 9.1882C10.4814 9.71437 10.0227 10.1166 9.46666 10.3087L5.67812 11.6174L12.3826 18.3219L13.6914 14.5334C13.8835 13.9773 14.2857 13.5187 14.8118 13.2556L19.6827 10.8201C20.4458 10.4386 20.6109 9.42152 20.0076 8.81822Z" /></svg>
              <p className="text-center text-xl">Reserve</p>
              <p className="text-center text-4xl py-2">{totalReserveCount}</p>
            </div>

            {/* Total cancelation */}
            <div className={`${styles.card} bg-red-500 space-y-2 text-white shadow-md `}>
              <svg className="h-9 w-9" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title />
                <path fill="#ffffff" d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
                <path fill="#ffffff" d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
              </svg>
              <p className="text-center text-xl">Cancel</p>
              <p className="text-center text-4xl py-2">{totalCancelCount}</p>
            </div>
          </div>

          {/* Admin mode toggle */}
          <div className="text-lg font-semibold text-center text-gray-500 border-b border-gray-200 mt-4">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${view === 'overview' ? 'text-blue-custom border-blue-custom' : ''}`}
                  onClick={() => setView('overview')}
                >
                  Overview
                </button>
              </li>
              <li className="me-2">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${view === "create" ? "text-blue-custom border-blue-custom" : ""}`}
                  onClick={() => setView("create")}
                >
                  Create
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-4 mt-5">

            {/* Overview Concert */}
            {view === "overview" &&
              <>
                {concerts && concerts.map((concert, index) => (
                  <ConcertCard
                    key={index}
                    name={concert.name}
                    id={concert._id}
                    description={concert.description}
                    totalSeats={concert.totalSeats}
                    reservedSeats={concert.reservedSeats}
                    onDelete={() => confirmConcertDelete(concert._id, concert.name)}
                  />
                ))}

                <Modal ref={modalRef} >
                  <div className="py-2 flex justify-center">
                    <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50"
                      fill='#FA5252'>
                      <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z">
                      </path>
                    </svg>
                  </div>
                  <div className="py-3 flex flex-col">
                    <p className="text-xl font-bold text-center">Are you sure to delete?</p>
                    <br></br>
                    <p className="text-xl font-bold text-center">{selectConcertName}</p>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-4 p-2">
                    <button className="btn w-full border-gray-400 bg-transparent hover:text-white hover:bg-gray-200" onClick={() => modalRef?.current?.close()}>
                      Cancel
                    </button>
                    <button className="btn w-full bg-red-500 text-white hover:text-white hover:bg-red-800" onClick={handleDeleteConcert}>
                      Yes, Delete
                    </button>
                  </div>
                </Modal>
              </>
            }

            {/* Create Concert */}
            {view === "create" &&
              <>
                <ConcertCreate onCreate={handleCreateConcert}></ConcertCreate>
              </>
            }
          </div>
        </>
      ) : (

        // user home page
        <>
          {concerts && concerts.map((concert, index) => (
            <ConcertCardUser
              key={index}
              name={concert.name}
              id={concert._id}
              description={concert.description}
              totalSeats={concert.totalSeats}
              reservedSeats={concert.reservedSeats}
              isReserved={concert.isReserved}
              onAction={handleReserveAction}
            />
          ))}
        </>
      )}

      {/* message display after admin create concert */}
      {showSuccessMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed top-5 right-5 flex align-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">Create concert success!</span>
        </div>
      )}

      {/* message display after admin delete concert */}
      {showDeleteMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed top-5 right-5 flex align-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">Delete concert success!</span>
        </div>
      )}

      {/* message display after user update reservation */}
      {showReservationMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed top-5 right-5 flex align-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">Update reservation success!</span>
        </div>
      )}

    </div>
  );
}
