import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Headers from "../components/Headers";
import '../styles/History.css'
import Calendar from "react-calendar";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import { historyData } from "../data/history";

export default function History() {
    const { language } = useLanguage();
    const t = translations[language];


    return (
        <>
            <NavBar active={2} />
            <div className="dash_board">
                <main className="dash_main main">
                    <Headers children={t.history} />
                    <HistoryContainer />
                </main>
            </div>
        </>
    )
}

const HistoryContainer = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Date sélectionnée
    const { language } = useLanguage();
    const t = translations[language];

    // Filtrer les historiques pour la date sélectionnée
    const filteredHistories = historyData.filter(item => {
        const itemDate = new Date(item.date);
        return (
            itemDate.getDate() === selectedDate.getDate() &&
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getFullYear() === selectedDate.getFullYear()
        );
    });

    // Fonction pour exporter en CSV
    const exportToCSV = () => {
        if (filteredHistories.length === 0) {
            alert(t.no_data_to_export); // Message si pas de données
            return;
        }

        const headers = ["Titre", "Date", "Heure", "Type"];
        const csvContent = [
            headers.join(","), // En-têtes
            ...filteredHistories.map(item => [
                `"${item.title}"`,
                item.date.toLocaleDateString(language),
                item.date.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' }),
                item.type
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `historique_${selectedDate.toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Fonction pour formater la date/heure
    const formatDateTime = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' });
        } else if (date.toDateString() === yesterday.toDateString()) {
            return t.yesterday;
        } else {
            return date.toLocaleDateString(language);
        }
    };

    const goToToday = () => {
        setSelectedDate(new Date());
    };


    return (
        <div className="histo_container">
            <div className="histo_item histo_item1">
                {/* Bouton seulement visible sur mobile */}
                <button
                    id="display_calendar"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="calendar-toggle-btn"
                >
                    {t.calendar}
                </button>

                <div className="histoItem_cont">
                    {filteredHistories.length > 0 ? (
                        filteredHistories.map(history => (
                            <div className="histo_content" key={history.id}>
                                <span>{history.title}</span>
                                <p>{formatDateTime(new Date(history.date))}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-history-message">
                            {t.no_history_for_date}
                        </div>
                    )}
                </div>
            </div>

            <div className="histo_item histo_item2">
                <button onClick={exportToCSV} disabled={filteredHistories.length === 0}>
                    {t.export}
                </button>
            </div>

            {/* Calendrier - toujours visible sur desktop, conditionnel sur mobile */}
            <div className={`histo_item histo_item3 ${window.innerWidth <= 800 ? (showCalendar ? 'show' : 'hide') : ''}`}>
                {window.innerWidth <= 800 && (
                    <button
                        className="close_calendar"
                        onClick={() => setShowCalendar(false)}
                        aria-label={t.close}
                    >
                        &times;
                    </button>
                )}
                <div className="custom_calendar_container">
                    <Calendar
                        className="custom_calendar"
                        locale={language}
                        value={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            if (window.innerWidth <= 800) {
                                setShowCalendar(false);
                            }
                        }}
                        navigationLabel={({ date, view }) => {
                            const options = { year: 'numeric', month: 'long' };
                            return date.toLocaleDateString(language, options);
                        }}
                        formatShortWeekday={(locale, date) =>
                            ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export const MyCalendar = () => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <Calendar
            className="custom_calendar"
            locale={language} // 'fr' ou 'en' selon la langue
            view="month"
            navigationLabel={({ date, view }) => {
                const options = { year: 'numeric', month: 'long' };
                return date.toLocaleDateString(language, options);
            }}
            formatShortWeekday={(locale, date) =>
                ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
            }
        />
    )
}

