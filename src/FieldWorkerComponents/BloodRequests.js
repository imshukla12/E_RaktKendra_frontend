import React, { useState } from 'react'

const BloodRequests = () => {
  const [bloodRequests, setBloodRequests] = useState([
    {
        "id": 1,
        "bloodType": "A+"
    },
    {
        "id": 2,
        "bloodType": "O+"
    },
    {
        "id": 3,
        "bloodType": "O+"
    }
]);
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(2);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = bloodRequests.slice(indexOfFirstItem, indexOfLastItem);

const pageNumbers = [];
for (let i = 1; i <= Math.ceil(bloodRequests.length / itemsPerPage); i++) {
    pageNumbers.push(i);
}

const renderPageNumbers = pageNumbers.map(number => (
    <li key={number} className={`p-2 cursor-pointer ${currentPage === number ? 'bg-gray-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`} onClick={() => setCurrentPage(number)}>
        {number}
    </li>
));

return (
    <div className="p-6 rounded-lg border-l-2 border-b-2 border-zinc-600 mt-4 bg-stone-300 shadow-xl">
        <table className="table-auto w-full mx-auto">
            <caption className="caption-top font-serif text-2xl p-2 border-b-2 border-zinc-600">Blood Requests</caption>
            <thead className="font-serif text-lg">
                <tr>
                    <th>Request.Id</th>
                    <th>BloodType</th>
                    {/* <th></th> */}
                </tr>
            </thead>
            <tbody className="font-serif text-md text-center">
                {currentItems.length > 0 ? (
                    currentItems.map((p) => (
                        <tr key={p.id} className='border-2 border-zinc-400'>
                            <td>{p.id}</td>
                            <td>{p.bloodType}</td>
                            <td className='flex flex-row'>
                                <div className='p-2'>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded"
                                    // onClick={() =>
                                    //     downloadPDF(p.prescriptionId, p.consultationDate)
                                    // }
                                >
                                    Accept
                                </button>
                                </div>
                                <div className='p-2'>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                                    // onClick={() =>
                                    //     downloadPDF(p.prescriptionId, p.consultationDate)
                                    // }
                                >
                                    Reject
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No requests found</td>
                    </tr>
                )}
            </tbody>
        </table>
        <ul className="flex justify-center mt-4">
            {renderPageNumbers}
        </ul>
    </div>
)
}

export default BloodRequests