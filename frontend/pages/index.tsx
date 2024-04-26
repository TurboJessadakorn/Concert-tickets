import styles from "@/styles/Home.module.css";
import { useState } from "react";

interface HomeProps {
  isAdmin: boolean;
}

export default function Home({ isAdmin }: HomeProps) {
  const [view, setView] = useState("overview");

  return (
    <div className="sm:pl-64 pl-12 py-12 pr-12">

      {/* admin home page */}
      {isAdmin ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total seat card */}
            <div className={`${styles.card} bg-sky-700 space-y-2 text-white shadow-md`}>
              <svg className="h-9 w-9" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="Guide" /><g id="Layer_2"><g>
                <path fill="#ffffff" d="M8,7c1.38,0,2.5-1.12,2.5-2.5S9.38,2,8,2S5.5,3.12,5.5,4.5S6.62,7,8,7z M8,3c0.83,0,1.5,0.67,1.5,1.5S8.83,6,8,6    S6.5,5.33,6.5,4.5S7.17,3,8,3z" />
                <path fill="#ffffff" d="M9.71,7.5H6.29C4.47,7.5,3,9.07,3,10.99v2.51C3,13.78,3.22,14,3.5,14h9c0.28,0,0.5-0.22,0.5-0.5v-2.51    C13,9.07,11.53,7.5,9.71,7.5z M12,13H4v-2.01C4,9.62,5.03,8.5,6.29,8.5h3.43c1.26,0,2.29,1.12,2.29,2.49V13z" /></g></g>
              </svg>
              <p className="text-center text-xl">Total of seats</p>
              <p className="text-center text-4xl py-2">500</p>
            </div>

            {/* Total reservation */}
            <div className={`${styles.card} bg-teal-600 space-y-2 text-white shadow-md`}>
              <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M16.2425 2.93179L21.0682 7.75756C22.3955 9.08482 22.0324 11.3223 20.3535 12.1618L15.4826 14.5972C15.3073 14.6849 15.1732 14.8378 15.1092 15.0232L13.6699 19.1894C13.3684 20.0621 12.2574 20.318 11.6045 19.6652L8.50002 16.5606L4.06074 21H3L3.00008 19.9393L7.43936 15.5L4.33487 12.3955C3.682 11.7426 3.93791 10.6316 4.81061 10.3301L8.97688 8.89087C9.16223 8.82684 9.31512 8.69278 9.40281 8.51739L11.8382 3.64651C12.6777 1.96763 14.9152 1.60453 16.2425 2.93179ZM20.0076 8.81822L15.1818 3.99245C14.5785 3.38915 13.5614 3.5542 13.1799 4.31732L10.7445 9.1882C10.4814 9.71437 10.0227 10.1166 9.46666 10.3087L5.67812 11.6174L12.3826 18.3219L13.6914 14.5334C13.8835 13.9773 14.2857 13.5187 14.8118 13.2556L19.6827 10.8201C20.4458 10.4386 20.6109 9.42152 20.0076 8.81822Z" /></svg>
              <p className="text-center text-xl">Reserve</p>
              <p className="text-center text-4xl py-2">500</p>
            </div>

            {/* Total cancelation */}
            <div className={`${styles.card} bg-red-500 space-y-2 text-white shadow-md `}>
              <svg className="h-9 w-9" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title />
                <path fill="#ffffff" d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
                <path fill="#ffffff" d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
              </svg>
              <p className="text-center text-xl">Cancel</p>
              <p className="text-center text-4xl py-2">500</p>
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
              </>
            }

            {/* Create Concert */}
            {view === "create" &&
              <>
              </>
            }
          </div>
        </>
      ) : (

        // user home page
        <>
          User
        </>
      )}
    </div>
  );
}
