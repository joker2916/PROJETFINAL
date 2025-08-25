import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Headers from "../components/Headers";
import '../styles/Notifications.css'
import Calendar from "react-calendar";
import { MyCalendar } from "./History";

const notifications = [
    {
        id: 1,
        title: "Reservoir Vide",
        date: "01.02.2025",
        time: "22:00"
    }
]

export default function Notifications() {
    return (
        <>
            <NavBar />
            <div className="dash_board">
                <main className="dash_main main">
                    <Headers children="Notifications" />
                    <NotifContainer />
                </main>
            </div>
        </>
    )
}

const NotifContainer = () => {


    const displayNotif = notifications.map(notif =>
        <li id={notif.id}
        >
            <div className="notif_left">
                <p li id={notif.id}>{notif.title}</p>
            </div>

            <div className="notif_right">
                <p li id={notif.id}>{notif.time}</p>
            </div>
        </li>
    )
    return (
        <div className="notif_container">
            <div className="notif_item noti_calendar">
                <MyCalendar />
            </div>
            <div className="notif_item ">
                <ul id={displayNotif}>{displayNotif}</ul>
            </div>
        </div>
    )
}