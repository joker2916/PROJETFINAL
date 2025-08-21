import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import api from "../services/api";
import { useTheme } from "../contexts/ThemeContext";
import NavBar from "../components/NavBar";
import Headers from "../components/Headers";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import CreateUser from "../components/CreateUser";
import DisplayUsers from "../components/DisplayUsers";
import UpdateUserBox from "../components/UpdateUserBox";
import '../styles/Settings.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DisplaySensors, { CreateSensor, UpdateSensorBox } from "../components/DisplaySensors";

export const users = [
    { firstName: 'Béni', lastName: 'NTAMBU', grade: "admin", id: 1 },
    { firstName: 'Yann', lastName: 'BANGA', grade: "viewer", id: 2 }
]

export const disableButton = (userGrade) => {
    return userGrade !== "admin"
}

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const { user, loading } = useUser();
    const navigate = useNavigate();
    const { language, toggleLanguage } = useLanguage(); // Nouveau
    const t = translations[language];

    useEffect(() => {
        if (!loading && !user) {
            navigate("/");
        }
    }, [loading, user]);

    if (loading) return null; // ou un loader élégant



    return (
        <>
            <NavBar active={3} />
            <div className="dash_board">
                <main className="dash_main main">
                    <Headers children="Paramètres" />
                    <SettingsContainer userGrade={user?.role} />
                </main>
            </div>
            {/* SensorBox */}
            {/* CreateUser */}

        </>
    )
}

const SettingsContainer = ({ userGrade }) => {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage(); // Nouveau
    const t = translations[language]; // Nouveau - raccourci pour les traductions

    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false)


    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [allUsers, setAllUsers] = useState([]); // 👈 Stocke tous les users

    const [showCreateSensorModal, setShowCreateSensorModal] = useState(false);
    const [showUpdateSensorModal, setShowUpdateSensorModal] = useState(false);
    const [sensorToEdit, setSensorToEdit] = useState(null);
    const [allSensors, setAllSensors] = useState([]);
    const [selectedSensors, setSelectedSensors] = useState([]);
    const [selectAllSensors, setSelectAllSensors] = useState(false);

    const handleSelectUser = (userId, isSelected) => {
        if (isSelected) {
            setSelectedUsers(prev => [...new Set([...prev, userId])]);
        } else {
            setSelectedUsers(prev => prev.filter(id => id !== userId));
            setSelectAll(false);
        }
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);

        if (!checked) {
            setSelectedUsers([]);
        } else {
            // Sélectionne tous les IDs
            const allIds = allUsers.map(user => user.id);
            setSelectedUsers(allIds);
        }
    };


    const handleDeleteSelected = async () => {
        try {
            const confirmed = window.confirm("Confirmer la suppression des utilisateurs sélectionnés ?");
            if (!confirmed) return;

            await Promise.all(
                selectedUsers.map(uid =>
                    api.delete(`/users/${uid}`)
                )
            );

            toast.success("Utilisateur supprimé avec succès !")
            window.location.reload(); // Recharge la page pour mettre à jour la liste
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
            console.error(err);
            toast.error("Erreur lors de la suppression");
        }
    };


    const enableButton = userGrade !== "admin";

    // Fonction pour ouvrir la modal
    const openModal = (type) => {
        setSensorType(type);
        setShowModal(true);
    };

    const openCreateBox = () => {
        setShowCreateModal(true)
    }

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    // Fonction pour ouvrir la modale d'édition
    const openUpdateBox = (user) => {
        setUserToEdit(user);
        setShowUpdateModal(true);
    };

    // Pour actualiser les utilisateurs dans DisplayUsers
    const [usersReloadKey, setUsersReloadKey] = useState(0);
    const reloadUsers = () => setUsersReloadKey(prev => prev + 1);

    return (
        <>
            <div className="setting_container">
                <div className="setting_content setting_content1">
                    <div className="setting_top">
                        <span>{t.users} <br /></span>
                        <span>
                            <input type="checkbox" id="select-all" checked={selectAll} onChange={handleSelectAll} />
                            <label htmlFor="select-all" style={{ color: '#7a7575' }}>{t.select_all}</label>
                        </span>
                        <ul className="setting_mid">

                            <DisplayUsers
                                selectedUsers={selectedUsers}
                                onSelectUser={handleSelectUser}
                                selectAll={selectAll}
                                onUsersLoaded={setAllUsers}
                                disableButton={disableButton(userGrade)}
                                onEditUser={openUpdateBox}
                            />
                        </ul>
                    </div>

                    <div className="setting_bot">
                        <button onClick={openCreateBox} disabled={disableButton(userGrade)}>{t.add}</button>
                        <button onClick={handleDeleteSelected} disabled={disableButton(userGrade)}>
                            {t.delete}
                        </button>
                    </div>
                </div>



                <div className="setting_content setting_content2">
                    <p>{t.thresholds}</p>

                    <div className="setting2_container">
                        {/* DisplaySensors */}
                        <ul className="setting_mid sensors-container">
                            <DisplaySensors
                                selectedSensors={selectedSensors}
                                onSelectSensor={(sensorId, isSelected) => {
                                    if (isSelected) {
                                        setSelectedSensors(prev => [...new Set([...prev, sensorId])]);
                                    } else {
                                        setSelectedSensors(prev => prev.filter(id => id !== sensorId));
                                        setSelectAllSensors(false);
                                    }
                                }}
                                selectAll={selectAllSensors}
                                onSensorsLoaded={setAllSensors}
                                onEditSensor={(sensor) => {
                                    setSensorToEdit(sensor);
                                    setShowUpdateSensorModal(true);
                                }}
                                enabled={enableButton}
                            />
                        </ul>
                        <div className="setting_bot sensors-button">
                            <button onClick={() => setShowCreateSensorModal(true)} disabled={enableButton}>{t.add}</button>
                            <button
                                onClick={async () => {
                                    const confirmed = window.confirm("Supprimer les capteurs sélectionnés ?");
                                    if (!confirmed) return;
                                    try {
                                        await Promise.all(selectedSensors.map(id => api.delete(`/sensors/${id}`)));
                                        toast.success("Capteurs supprimés !");
                                        window.location.reload();
                                    } catch (err) {
                                        console.error(err);
                                        toast.error("Erreur lors de la suppression");
                                    }
                                }}
                                disabled={enableButton}
                            >
                                {t.delete}
                            </button>
                        </div>

                    </div>
                </div>

                <div className="setting_content setting_content3">
                    <form className="settingTh_bot">
                        <span>{t.displayMode}</span>
                        <div className="input_div">
                            <input
                                type="radio"
                                name="theme"
                                id="light"
                                checked={theme === 'light'}
                                onChange={() => toggleTheme('light')}
                            />
                            <label htmlFor="light">{t.light}</label>
                        </div>
                        <div className="input_div">
                            <input
                                type="radio"
                                name="theme"
                                id="dark"
                                checked={theme === 'dark'}
                                onChange={() => toggleTheme('dark')}
                            />
                            <label htmlFor="dark">{t.dark}</label>
                        </div>
                    </form>

                    <form className="settingTh_bot">
                        <span>{t.language}</span>
                        <div className="input_div">
                            <input
                                type="radio"
                                name="lang"
                                id="fr"
                                checked={language === 'fr'}
                                onChange={() => toggleLanguage('fr')}
                            />
                            <label htmlFor="fr">{t.french}</label>
                        </div>
                        <div className="input_div">
                            <input
                                type="radio"
                                name="lang"
                                id="en"
                                checked={language === 'en'}
                                onChange={() => toggleLanguage('en')}
                            />
                            <label htmlFor="en">{t.english}</label>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <SensorBox
                    sensorType={sensorType}
                    sensorValue={thresholds[sensorType]}
                    onClose={() => setShowModal(false)}

                />
            )}

            {showCreateModal && (<CreateUser onClose={() => setShowCreateModal(false)} />)}

            {showUpdateModal && userToEdit && (
                <UpdateUserBox
                    user={userToEdit}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdated={reloadUsers}
                />
            )}

            {showCreateSensorModal && (
                <CreateSensor onClose={() => setShowCreateSensorModal(false)} />
            )}

            {showUpdateSensorModal && sensorToEdit && (
                <UpdateSensorBox
                    sensor={sensorToEdit}
                    onClose={() => setShowUpdateSensorModal(false)}
                    onUpdated={() => window.location.reload()}
                />
            )}
            {/* CreateUser */}
        </>
    );
};

