import { useState } from 'react';

const useIrrigationControl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Envoie une commande d'irrigation au backend Render.
   * @param {boolean} value true pour démarrer, false pour arrêter.
   */
  const toggleIrrigation = async (value) => {
    setLoading(true);
    setError(null);
    const url = 'https://projetfinal-wg3g.onrender.com/api/esp32/data';
    const payload = {
        relaisManualState: value,
        relaisAutoEnabled: false // On désactive l'auto-mode lors d'une commande manuelle
    };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      console.log(`Commande d'irrigation envoyée avec succès: ${value}`);
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la commande:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { toggleIrrigation, loading, error };
};

export default useIrrigationControl;
