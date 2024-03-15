import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SingleRoomDetails = () => {
  const location = useLocation();
  const { roomNumber, roomType, pricePerHour, imageUrl } = location.state || {};

  return (
    <div className="w-full xl:w-[1100px] mx-auto mt-6 flex flex-col xl:flex-row">
      <div className="mx-auto">
        <div className="mb-6">
          <img
            className="w-[300px] h-[200px] xl:w-[710px] xl:h-[430px] rounded-md"
            src={imageUrl}
            alt=""
          />
        </div>

        <div className="flex gap-4 xl:gap-0 xl:ml-2 flex-col justify-center items-center xl:justify-normal xl:flex-row">
          <div className="w-[235px] h-[140px] bg-[#414159] flex items-center justify-center mr-[1px]">
            <div className="text-center">
              <p className="text-xl font-bold text-white">Size:</p>
              <p className="text-xl text-[#EDDFBA]">400 Sq-ft</p>
            </div>
          </div>
          <div className="w-[235px] h-[140px] bg-[#414159] flex items-center justify-center mr-[1px]">
            <div className="text-center">
              <p className="text-xl font-bold text-white">Capacity:</p>
              <p className="text-xl text-[#EDDFBA]">
                02 Adult & 02 Childs (below 10 Years)
              </p>
            </div>
          </div>
          <div className="w-[235px] h-[140px] bg-[#414159] flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-bold text-white">Bed:</p>
              <p className="text-xl text-[#EDDFBA]">Double</p>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[730px] mb-4">
          <div>
            <p className="text-2xl font-semibold text-gray-900 mb-4 mt-4">
              Room Services
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div>
                <img
                  src="http://www.hotels.gov.bd/forntend/img/core-img/icon1.png"
                  alt=""
                />
              </div>
              <p>Air Conditioning</p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <img
                  src="http://www.hotels.gov.bd/forntend/img/core-img/icon3.png"
                  alt=""
                />
              </div>
              <p> Restaurant quality </p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <img
                  src="http://www.hotels.gov.bd/forntend/img/core-img/icon4.png"
                  alt=""
                />
              </div>
              <p>Cable TV</p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <img
                  src="http://www.hotels.gov.bd/forntend/img/core-img/icon5.png"
                  alt=""
                />
              </div>
              <p>Unlimited Wifi</p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <img
                  src="http://www.hotels.gov.bd/forntend/img/core-img/icon6.png"
                  alt=""
                />
              </div>
              <p>Service 24/7</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E3E3ED] w-11/12  h-[310px] xl:w-1/2 mx-auto flex-col flex justify-center rounded-md">
        <div className="">
          <div className="mb-2">
            <p className="text-3xl mb-6 text-gray-800 font-bold pt-4 text-center">
              Room Details
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <div>
                <p className="text-black">Room Number</p>
                <span
                  className="text-center items-center justify-center text-2xl pl-9 font-semibold mt-2" // Set minDate to today's date
                >
                  {roomNumber}
                </span>
              </div>
              <div>
                <p className="text-black">Room Type</p>
                <span
                  className="text-center items-center justify-center text-2xl pl-9 font-semibold mt-2" // Set minDate to today's date
                >
                  {roomType}
                </span>
              </div>
            </div>
            <div className="pl-3">
              <span className="text-2xl font-semibold">Price: </span>
              <input
                type="Price"
                value={`₹${pricePerHour}/hour`}
                readOnly
                className="h-10 w-34 bg-white text-center rounded outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <Link to="/add" state={{ roomNumber, roomType, pricePerHour }}>
                <button className="bg-[#000080] text-white h-10 w-[200px] mt-2 p-2 rounded-full">
                  Book Room
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoomDetails;
