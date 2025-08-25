import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import api from "../services/api";
import '../styles/CreateUser.css';
import { toast } from "react-toastify";

const SENSOR_TYPES = [
    { key: "thermique", label: "Température" },
    { key: "humidite", label: "Humidité du sol" },
    { key: "co2", label: "Niveau de CO₂" },
    { key: "luminosite", label: "Luminosité" },
    { key: "eau", label: "Niveau d'eau" }
];


export default function DisplaySensors({
    onSensorsLoaded,
    onEditSensor,
    selectedSensors,
    onSelectSensor,
    selectAll,
    enabled
}) {
    const [sensors, setSensors] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/sensors")
            .then(res => {
                setSensors(res.data);
                onSensorsLoaded(res.data);
            })
            .catch(err => {
                console.error("Erreur API GET /sensors:", err);
                setError("Erreur lors du chargement des capteurs.");
            });
    }, []);

    if (error) return <p className="error">{error}</p>;

    return (
        <>
            {sensors.map(sensor => (
                <li key={sensor.id}
                >
                    <input
                        type="checkbox"
                        id={`sensor${sensor.id}`}
                        checked={selectAll || selectedSensors.includes(sensor.id)}
                        onChange={(e) => onSelectSensor(sensor.id, e.target.checked)}
                    />
                    <label htmlFor={`sensor${sensor.id}`}>
                        {sensor.name}: {sensor.value} {sensor.unit}
                    </label>
                    <button className="update-user" onClick={() => onEditSensor(sensor)} disabled={enabled}>Modifier</button>
                </li>
            ))}
        </>
    );
}

export function CreateSensor({ onClose }) {
    const { language } = useLanguage();
    const t = translations[language];

    const [type, setType] = useState("thermique");
    const [value, setValue] = useState("");
    const [unit, setUnit] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/sensors", {
                type, value: parseFloat(value), unit
            });
            location.reload
            toast.success("Capteur créé avec succès !");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la création du capteur");
        }
    };

    return (
        <div className="sensor_modal create-user-main">
            <form className="sensor_container create-user-container" onSubmit={handleSubmit}>
                <div className="create-user-top">
                    <span>Créer un capteur</span>

                    <div className="input-select-role">
                        {SENSOR_TYPES.map(({ key, label }) => (
                            <div key={key}>
                                <input
                                    type="radio"
                                    id={key}
                                    name="sensorType"
                                    className="select-role"
                                    checked={type === key}
                                    onChange={() => setType(key)}
                                />
                                <label htmlFor={key}>{label}</label>
                            </div>
                        ))}
                    </div>

                    <input
                        type="number"
                        step="0.1"
                        placeholder="Valeur"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Unité"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                    />
                </div>

                <div className="sensor_button" style={{ marginTop: '20px' }}>
                    <button type="submit">{t.validate}</button>
                    <button type="button" onClick={onClose}>{t.cancel}</button>
                </div>
            </form>
        </div>
    );
}


export function UpdateSensorBox({ sensor, onClose, onUpdated }) {
    const { language } = useLanguage();
    const t = translations[language];

    const [type, setType] = useState(sensor.type || "thermique");
    const [value, setValue] = useState(sensor.value || "");
    const [unit, setUnit] = useState(sensor.unit || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/sensors/${sensor.id}`, {
                type,
                value: parseFloat(value),
                unit
            });
            toast.success("Capteur mis à jour !");
            onUpdated?.();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la mise à jour");
        }
    };

    return (
        <div className="sensor_modal create-user-main">
            <form className="sensor_container create-user-container" onSubmit={handleSubmit}>
                <div className="create-user-top">
                    <span>Modifier le capteur</span>

                    <div className="input-select-role">
                        {SENSOR_TYPES.map(({ key, label }) => (
                            <div key={key}>
                                <input
                                    type="radio"
                                    id={`edit-${key}`}
                                    name="sensorType"
                                    className="select-role"
                                    checked={type === key}
                                    onChange={() => setType(key)}
                                />
                                <label htmlFor={`edit-${key}`}>{label}</label>
                            </div>
                        ))}
                    </div>

                    <input
                        type="number"
                        step="0.1"
                        placeholder="Valeur"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Unité"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                    />
                </div>

                <div className="sensor_button" style={{ marginTop: '20px' }}>
                    <button type="submit">{t.validate}</button>
                    <button type="button" onClick={onClose}>{t.cancel}</button>
                </div>
            </form>
        </div>
    );
}
