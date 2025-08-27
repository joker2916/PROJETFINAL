import fetch from 'node-fetch';

/**
 * Envoie une commande d'irrigation au backend Render pour que l'ESP32 la lise.
 * @param {boolean} value La valeur true/false pour l'irrigation.
 */
async function sendCommandToRender(value) {
    const url = 'https://projetfinal-wg3g.onrender.com/api/esp32/data'; // L'URL de votre endpoint pour les commandes

    const payload = {
        relaisManualState: value,
        relaisAutoEnabled: false // On désactive l'auto-mode lors d'une commande manuelle
    };

    try {
        const response = await fetch(url, {
            method: 'POST', // Ou POST, selon la configuration de votre backend Render
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log(`Commande d'irrigation envoyée au backend Render: ${value}`);
            return { success: true };
        } else {
            console.error(`Erreur lors de l'envoi de la commande à Render: ${response.status}`);
            return { success: false, status: response.status };
        }
    } catch (error) {
        console.error('Erreur réseau lors de la communication avec Render:', error.message);
        return { success: false, message: error.message };
    }
}