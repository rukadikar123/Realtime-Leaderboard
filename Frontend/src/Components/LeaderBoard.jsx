import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

function LeaderBoard({ leaderBoard }) {
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [currentPage, setCurrentPage] = useState(0);

  function getItemsPerPage() {
    return window.innerWidth < 768 ? 3 : 4;
  }

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(0); 
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(leaderBoard.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleUsers = leaderBoard.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-[#04134a] rounded shadow-md p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#daa872]">🏆 Leaderboard</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {visibleUsers.map((user, index) => (
          <div
            key={index}
            className="bg-[#152b76] rounded-lg cursor-pointer transition transform duration-300 hover:scale-105  md:px-4 md:py-2 py-1 flex flex-col items-center gap-2 w-[125px] md:w-[160px]"
          >
            <div className="rounded-full h-14 w-14 bg-[#f98a20] "><FaUserAlt size={20} className="relative top-4 left-[18px]  text-white"/></div>
            <span className="font-semibold text-[#e5f0fe] capitalize text-center truncate whitespace-nowrap overflow-hidden w-[120px]">
              #{user?.rank} {user?.name}
            </span>
            <span className="text-[#d6fcf9] bg-[#1ec4a9] px-4 py-1 rounded-xl text-sm">{user?.totalPoints} pts</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default LeaderBoard;




{/*
  
  <div className="flex flex-wrap gap-4 justify-center">
        {visibleUsers.map((user, index) => (
          <div
            key={index}
            className="bg-[#152b76] rounded-lg cursor-pointer transition transform duration-300 hover:scale-105 px-6 py-3 gap-2 flex flex-col items-center min-w-[140px]"
          >
            <div className="rounded-full h-14 w-14 bg-[#f98a20] "><FaUserAlt size={20} className="relative top-4 left-[18px]  text-white"/></div>
            <span className="font-semibold text-[#e5f0fe] capitalize text-center">
              #{user?.rank} {user?.name}
            </span>
            <span className="text-[#d6fcf9] bg-[#1ec4a9] px-4 py-1 rounded-xl text-sm">{user?.totalPoints} pts</span>
          </div>
        ))}
        
      </div> */}