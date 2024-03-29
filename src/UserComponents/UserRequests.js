import React, { useEffect, useState } from "react";
import axios from "axios";

const UserRequests = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const bloodType = ["O+", "A+", "A-", "B+", "B-", "AB"];
    const [bloodBanks,setBloodBanks] = useState([])
    const [show, setShow] = useState(false);
    const [showDonation, setShowDonation] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDonation, setIsOpenDonation] = useState(false);
    const [isOpenPlace, setIsOpenPlace] = useState(false);
    const [isOpenPlaceDonation, setIsOpenPlaceDonation] = useState(false);
    const [quantity, setQuantity] = useState("")
    const [selectedBloodType, setSelectedBloodType] = useState("");
    // const [selectedBloodTypeDonation, setSelectedBloodTypeDonation] = useState("");
    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedPlaceDonation, setSelectedPlaceDonation] = useState("");
    const [prevDonationRequest, setPrevDonationRequest] = useState(false)
    const [prevBloodRequest, setPrevBloodRequest] = useState(false)
    const [count, setCount] = useState(0)

    const toggleModal = () => {
        setShow(!show);
    };

    const toggleDonationModal = () => {
        setShowDonation(!showDonation);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleDonationClose = () => {
        setShowDonation(false);
    };

    const handleSelectBloodType = (blood) => {
        setSelectedBloodType(blood);
        setIsOpen(false);
    };

    // const handleSelectBloodTypeDonation = (blood) => {
    //     setSelectedBloodTypeDonation(blood);
    //     setIsOpenDonation(false);
    // };

    const handleSelectBloodBank = (bank) => {
        setSelectedPlace(bank);
        setIsOpenPlace(false);
    };

    const handleSelectBloodBankDonation = (bank) => {
        setSelectedPlaceDonation(bank);
        setIsOpenPlaceDonation(false);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        const data = {
            "bloodBankId": selectedPlace,
            "bloodType": selectedBloodType,
            "userId": user.userId,
            "quantity": quantity
        }
        // console.log("data", data)
        setShow(!show)
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.post(`http://localhost:9090/bloodRequest/bloodRequestByUser`, data)
            .then((response) => {
                if (response.data == true) {
                    alert("Request is accepted.You can visit the selected bank for collecting blood.")
                } else if (response.data == false) {
                    alert("Request is denied, the selected blood type and quantity is not available in the selected blood bank.")
                }
                setCount(count+1)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const submitHandlerDonation = async (event) => {
        event.preventDefault()
        const data = {
            "bankId": selectedPlaceDonation,
            "bloodType": user.bloodType,
            "userId": user.userId
        }
        // console.log("data", data)
        setShowDonation(!showDonation)
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.post(`http://localhost:9090/bloodDonation/bloodDonationRequest`, data)
            .then((response) => {
                // console.log("response", response.data)
                alert("Your request is saved. You can go to your selected bank and donate there. ThankYou!!")
                setCount(count + 1)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchPrevDonationRequest = async () => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.get(`http://localhost:9090/bloodDonation/checkBloodDonationRequest/${user.userId}`)
            .then((response) => {
                // console.log("prevDona", response.data)
                setPrevDonationRequest(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchPrevBloodRequest = async () => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.get(`http://localhost:9090/bloodRequest/checkBloodRequest/${user.userId}`)
            .then((response) => {
                // console.log("prevBloodRequest",response.data)
                setPrevBloodRequest(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deletePrevDonationRequest = async () => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.delete(`http://localhost:9090/bloodDonation/revokeBloodDonationRequest/${user.userId}`)
            .then((response) => {
                // console.log(response.data)
                setCount(count + 1)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deletePrevBloodRequest = async() => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.delete(`http://localhost:9090/bloodRequest/revokeBloodRequest/${user.userId}`)
        .then((response) => {
            // console.log(response.data)
            setCount(count+1)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const fetchBloodBanks = async() => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.get(`http://localhost:9090/bloodBank/getCitiesAndBankId`)
        .then((response) => {
            setBloodBanks(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchBloodBanks()
        fetchPrevDonationRequest()
        fetchPrevBloodRequest()
    }, [count])

    return (
        <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-8 space-y-8 mt-8 w-4/5 font-serif">
            <p className="font-serif text-5xl text-red-700">
                Welcome to E-RaktKendra
            </p>
            <div className="flex flex-row justify-evenly w-2/3 space-x-6">
                <div>
                    {/* Request Button to open modal */}
                    {prevBloodRequest ?
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deletePrevBloodRequest}>
                            Revoke Request Blood
                        </button> :
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>
                            Request Blood
                        </button>}
                    {/* Modal */}
                    {show && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                    {/* Modal content */}
                                    <div className="bg-blue-50 flex flex-col justify-center items-center">
                                        <div className="flex flex-row justify-between items-center w-full p-4">
                                            <h2 className="text-xl font-bold font-serif ml-8">
                                                Request For Blood
                                            </h2>
                                            <button onClick={handleClose}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-gray-500 hover:text-gray-700"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        {/* bloodType button */}
                                        <div className="relative flex flex-col items-center w-[340px] rounded-lg">
                                            <button onClick={() => setIsOpen((prev) => !prev)} className="p-2 bg-blue-100 w-full flex items-center justify-between mb-4 font-serif text-lg rounded-lg border-2 border-gray-500 active:border-blue-100 duration-300">
                                                {selectedBloodType ? selectedBloodType : "Select Blood Group"}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            {isOpen && (
                                                <div className="mt-2 top-full flex flex-col items-start p-2 w-[340px] rounded-lg overflow-y-auto max-h-56">
                                                    {bloodType.map((blood, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex w-full justify-between hover:bg-blue-100 p-2 cursor-pointer"
                                                            onClick={() => handleSelectBloodType(blood)}
                                                        >
                                                            <h3>{blood}</h3>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative z-0 w-[340px] rounded-lg mb-6 group">
                                            <input type="text" name="quantity" id="quantity" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                            <label for="quantity" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">quantity</label>
                                        </div>
                                        {/* bloodBank button */}
                                        <div className="relative flex flex-col items-center w-[340px] rounded-lg">
                                            <button
                                                onClick={() => setIsOpenPlace((prev) => !prev)}
                                                className="p-2 bg-blue-100 w-full flex items-center justify-between font-serif text-lg rounded-lg border-2 border-gray-500 active:border-blue-100 duration-300"
                                            >
                                                {selectedPlace ? selectedPlace : "Select Blood Bank"}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            {isOpenPlace && (
                                                <div className="bg-blue-50 mt-2 top-full flex flex-col items-start p-2 w-[340px] rounded-lg overflow-y-auto max-h-56">
                                                    {bloodBanks.map((bank, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex w-full justify-between hover:bg-blue-100 p-2 cursor-pointer"
                                                            onClick={() => handleSelectBloodBank(bank.bankId)}
                                                        >
                                                            <h3>{bank.city}</h3>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mb-6"
                                            onClick={submitHandler}
                                        >
                                            Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* blood donation request button */}
                <div>
                    {prevDonationRequest ?
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deletePrevDonationRequest}>
                            Revoke Request Blood Donation
                        </button>
                        : <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={toggleDonationModal}>
                            Request Blood Donation
                        </button>}
                    {/* Modal */}
                    {showDonation && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                    {/* Modal content */}
                                    <div className="bg-blue-50 flex flex-col justify-center items-center">
                                        <div className="flex flex-row justify-between items-center w-full p-4">
                                            <h2 className="text-xl font-bold font-serif ml-8">
                                                Request For Blood Donation
                                            </h2>
                                            <button onClick={handleDonationClose}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-gray-500 hover:text-gray-700"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        {/* bloodType button */}
                                        {/* <div className="relative flex flex-col items-center w-[340px] rounded-lg">
                                            <button onClick={() => setIsOpenDonation((prev) => !prev)} className="p-2 bg-blue-100 w-full flex items-center justify-between mb-4 font-serif text-lg rounded-lg border-2 border-gray-500 active:border-blue-100 duration-300">
                                                {selectedBloodTypeDonation ? selectedBloodTypeDonation : "Select Blood Group"}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            {isOpenDonation && (
                                                <div className="mt-2 top-full flex flex-col items-start p-2 w-[340px] rounded-lg overflow-y-auto max-h-56">
                                                    {bloodType.map((blood, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex w-full justify-between hover:bg-blue-100 p-2 cursor-pointer"
                                                            onClick={() => handleSelectBloodTypeDonation(blood)}
                                                        >
                                                            <h3>{blood}</h3>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div> */}
                                        {/* bloodBank button */}
                                        <div className="relative flex flex-col items-center w-[340px] rounded-lg">
                                            <button
                                                onClick={() => setIsOpenPlaceDonation((prev) => !prev)}
                                                className="p-2 bg-blue-100 w-full flex items-center justify-between font-serif text-lg rounded-lg border-2 border-gray-500 active:border-blue-100 duration-300"
                                            >
                                                {selectedPlaceDonation ? selectedPlaceDonation : "Select Blood Bank"}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            {isOpenPlaceDonation && (
                                                <div className="bg-blue-50 mt-2 top-full flex flex-col items-start p-2 w-[340px] rounded-lg overflow-y-auto max-h-56">
                                                    {bloodBanks.map((bank, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex w-full justify-between hover:bg-blue-100 p-2 cursor-pointer"
                                                            onClick={() => handleSelectBloodBankDonation(bank.bankId)}
                                                        >
                                                            <h3>{bank.city}</h3>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mb-6"
                                            onClick={submitHandlerDonation}
                                        >
                                            Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserRequests;
