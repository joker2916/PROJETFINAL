// src/data/historyData.js
export const historyData = [
    {
        id: 1,
        title: "Réservoir rempli",
        date: new Date(2023, 5, 15, 10, 40), // année, mois (0-11), jour, heure, minute
        type: "water"
    },
    {
        id: 2,
        title: "Température élevée",
        date: new Date(), // Aujourd'hui
        type: "temp"
    },
    {
        id: 3,
        title: "Niveau de CO2 critique",
        date: new Date(new Date().setDate(new Date().getDate() - 1)), // Hier
        type: "co2"
    },
    // Ajoute d'autres entrées selon tes besoins
];