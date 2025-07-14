import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import socket from "../socket";

function LeaderBoard() {
    const [leaderBoard,setLeaderBoard]=useState([])

    useEffect(()=>{
         
        axios.get(`${import.meta.env}/api/leaderboard`).then((res)=>{
            setLeaderBoard(res?.data)
        })

        socket.on("leaderboardUpdate",(data)=>{
            setLeaderBoard(data)
        })

        return ()=>{
            socket.off("leaderboardUpdate")
        }

    },[])




  return (
    <>

    </>
  );
}

export default LeaderBoard;
