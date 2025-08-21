import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Headers from "../components/Headers";
import '../styles/DashBoardHome.css'
import ampoule from '../assets/img/ampoule.png'
import api from "../services/api";
import venti from '../assets/img/ventilateur.png'
import arros from '../assets/img/arrosoir.png'
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import { users } from "./Settings";
import { disableButton } from "./Settings";
import { useUser } from "../contexts/UserContext";
import ClickSpark from "../components/ClickSpark";


export default function DashBoardHome() {
    const { user } = useUser();
    const { language } = useLanguage();
    const t = translations[language];


    return (
        <>
            <NavBar active={1} />
            <div className="dash_board">
                <main className="dash_main main">
                    <Headers children={`${t.greeting}, ${user?.firstName}`} />
                    <DashBoardContainer userGrade={user?.role} />
                </main>
            </div>
        </>
    )
}

export const DashBoardContainer = ({ userGrade }) => {
    const { language } = useLanguage();
    const t = translations[language];
    const [sensors, setSensors] = useState([]);
    const [realHumidity, setRealHumidity] = useState(null);
    const [realTemperature, setRealTemperature] = useState(null);
    const [realWaterLevel, setRealWaterLevel] = useState(null);
    const [realLight, setRealLight] = useState(null);

    useEffect(() => {
        // Charger les capteurs enregistrés
        const fetchSensors = async () => {
            try {
                const res = await api.get("/sensors");
                setSensors(res.data);
            } catch (err) {
                console.error("Erreur capteurs :", err);
            }
        };

        fetchSensors();

        // Lecture des données ESP32 toutes les 3 secondes
        const interval = setInterval(async () => {
            try {
                const res = await api.get("/esp32/data");
                const humidity = res.data.soil; // correspond à ton ESP32 JSON
                const temperature = res.data.gaz;
                const waterLevel = res.data.tank;
                const light = res.data.ldr;
                setRealHumidity(humidity);
                setRealTemperature(temperature);
                setRealWaterLevel(waterLevel);
                setRealLight(light);
            } catch (err) {
                console.error("Erreur ESP32:", err);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Fonction utilitaire pour trouver un capteur par type
    const getSensorValue = (type) => {
        const sensor = sensors.find(s => s.type === type);
        return sensor ? sensor.value : null;
    };

    // ToggleLed
    const toggleLED = async () => {
        try {
            await api.patch("/esp32/toggle-led");
            console.log("LED toggled");
        } catch (err) {
            console.error("Erreur de contrôle de la LED :", err);
        }
    };


    return (
        <main className="dash_container">

            {/* Capteur Humidité */}
            {getSensorValue("humidite") !== null && (
                <div className="dash_item dash_item1">
                    <span className="dash_function">{t.humidity}</span>
                    <div className="dash_span">
                        <span>
                            {realHumidity !== null ? `${realHumidity} ` : `${getSensorValue("humidite")} `}
                        </span>
                    </div>
                </div>
            )}

            {/* Temperature */}
            {getSensorValue("thermique") !== null && (
                <div className="dash_item dash_item2">
                    <span className="dash_function">{t.temperature}</span>
                    <div className="dash_span">
                        <span>
                            {realTemperature !== null ? `${realTemperature}` : `${getSensorValue("thermique")}`}
                        </span>
                    </div>
                </div>
            )}


            {getSensorValue("co2") !== null && (
                <div className="dash_item dash_item3">
                    <span className="dash_function">CO2</span>
                    <div className="dash_span">
                        {/* <span>{getSensorValue("co2")}%</span> */}
                        <span>{realTemperature !== null ? `${realTemperature}` : `${getSensorValue("thermique")}`}</span>

                    </div>
                </div>
            )}

            {getSensorValue("luminosite") !== null && (
                <div className="dash_item dash_item4">
                    <span className="dash_function">{t.brightness}</span>
                    <div className="dash_span">
                        <span>
                            {realLight !== null ? `${realLight}` : getSensorValue("luminosite")}
                        </span>
                        {/* <span>{getSensorValue("luminosite")}%</span> */}
                    </div>
                </div>
            )}

            {/* Niveau d'eau */}
            {getSensorValue("eau") !== null && (
                <div className="dash_item dash_item5">
                    <span className="dash_function">{t.tank}</span>
                    <div className="dash_span">
                        <span>
                            {realWaterLevel !== null ? `${realWaterLevel} %` : "Vide"}
                        </span>
                        {/* <span>{getSensorValue("eau") > 0 ? "Plein" : "Vide"}</span> */}
                    </div>
                </div>
            )}

            {/* Actionneurs */}
            <button className="dash_item dash_item6 dash_action" disabled={disableButton(userGrade)} onClick={toggleLED}>
                <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
                    <div className="dash_act_img">
                        <img src={ampoule} alt="Icône ampoule" />
                    </div>
                    <span className="dash_function">{t.actuator}</span>
                    <div className="dash_span">
                        <span>{t.brightness}</span>
                    </div>
                </ClickSpark>
            </button>

            <button className="dash_item dash_item7 dash_action" disabled={disableButton(userGrade)}>
                <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
                    <div className="dash_act_img">
                        <img src={venti} alt="Icône ventilateur" />
                    </div>
                    <span className="dash_function">{t.actuator}</span>
                    <div className="dash_span">
                        <span>Ventilation</span>
                    </div>
                </ClickSpark>
            </button>

            <button className="dash_item dash_item8 dash_action" disabled={disableButton(userGrade)}>
                <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
                    <div className="dash_act_img">
                        <img src={arros} alt="Icône arrosoir" />
                    </div>
                    <span className="dash_function">{t.actuator}</span>
                    <div className="dash_span">
                        <span>Irrigation</span>
                    </div>
                </ClickSpark>
            </button>
        </main>
    );
};