import React from 'react';
import "../styles/Container.css"

const Container = () => {
    return (
    <div class="centered-container">
        <div className="container">
            <div class="col gauche">
                    <div class="titleJobs">Ingenieur Blockchain</div>
                    <div class="subtitle">Sept 2025 - Futur</div>
                    <div class="titleJobs">Ingenieur Blockchain</div>
                    <div class="subtitle">Sept 2025 - Futur</div>
                    <div class="titleJobs">Ingenieur Blockchain</div>
                    <div class="subtitle">Sept 2025 - Futur</div>
            </div>
            <div class="col droite">
                <div class="description">Fin de mes études à l'ESGI Paris</div>
                <div class="description">Fin du cycle de 3ans d’études dans le domaine de la sécurité informatique. </div>
                <div class="description">Echange universitaire en corée du sud, dans l’université de Hanyang à Seoul.
    Mon major étais Computer science / Data analyst.</div>
            </div>
    </div>
</div>
    );
};

export default Container;