import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BloodRequests = () => {
    const fieldWorker = JSON.parse(localStorage.getItem("fieldWorker"))
    const [bloodRequests, setBloodRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [count,setCount] = useState(0)

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

    const getAllBloodRequests = async() => {
        const jwtToken=localStorage.getItem("jwtToken")
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
        await axios.get(`http://localhost:9090/bloodRequest/getAllBloodRequests/${fieldWorker.bloodBankId}`)
        .then((response) => {
            setBloodRequests(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const acceptRequest = async(id) => {
        const jwtToken=localStorage.getItem("jwtToken")
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
        await axios.delete(`http://localhost:9090/bloodRequest/acceptBloodRequest/${id}`)
        .then((response) => {
            console.log(response.data)
            setCount(count+1)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const rejectRequest = async(userId) => {
        const jwtToken=localStorage.getItem("jwtToken")
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
        await axios.delete(`http://localhost:9090/bloodRequest/revokeBloodRequest/${userId}`)
        .then((response) => {
            console.log(response.data)
            setCount(count+1)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllBloodRequests()
    },[count])

    return (
        <div className="p-6 rounded-lg border-l-2 border-b-2 border-zinc-600 mt-4 bg-stone-300 shadow-xl">
            <table className="table-auto w-full mx-auto">
                <caption className="caption-top font-serif text-2xl p-2 border-b-2 border-zinc-600">Blood Requests</caption>
                <thead className="font-serif text-lg">
                    <tr>
                        <th>Request.Id</th>
                        <th>BloodType</th>
                        <th>UserId</th>
                        <th>Quantity</th>
                        <th>total Cost</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody className="font-serif text-md text-center">
                    {currentItems.length > 0 ? (
                        currentItems.map((p) => (
                            <tr key={p.id} className='border-2 border-zinc-400'>
                                <td>{p.bloodRequestId}</td>
                                <td>{p.bloodType}</td>
                                <td>{p.userId}</td>
                                <td>{p.quantity}</td>
                                <td>{p.totalCost}</td>
                                <td className='flex flex-row'>
                                    <div className='p-2'>
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded"
                                            onClick={() => acceptRequest(p.bloodRequestId)}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                    <div className='p-2'>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                                            onClick={() => rejectRequest(p.userId)}
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