import React from 'react';
import "../styles/Container.css"

const Container = () => {
    return (
    <div class="centered-container">
        <div className="container">
            <div className="col gauche">
                    <div class="titleJobs">Ingenieur Blockchain</div>
                    <div class="subtitle">Sept 2023 - En cours</div>
                </div>
                <div className='col droite'>
                    <div class="description">Actuellement en formation d'ingénieur spécialisé en Blockchain à l'ESGI Paris, je suis passionné par les nouvelles technologie et de ses applications révolutionnaires dans divers domaines</div>
                </div>

                <div className="col gauche">
                    <div class="titleJobs">Bachelor en Sécurité Informatique</div>
                    <div class="subtitle">Sept 2020 - Sept 2023</div>
                </div>
                <div className='col droite'>
                    <div class="description">Au cours de ce cycle de trois ans, j'ai acquis des connaissances approfondies dans le domaine de la sécurité informatique, me permettant de comprendre et de contrecarrer diverses menaces et vulnérabilités. </div>
                </div>

                <div className="col gauche">
                    <div class="titleJobs">Échange Universitaire en Corée du Sud</div>
                    <div class="subtitle">Août 2022 - Avril 2023</div>
                    </div>
                <div className='col droite'>
                    <div class="description">Cette immersion m'a offert une perspective globale et m'a permis d'approfondir mes compétences en informatique et en analyse de données au sein d'une université de renom, Hanyang university.</div>
                </div>

                <div className="col gauche">
                    <div class="titleJobs">Développeur - Expert Retail Pro Prism</div>
                    <div class="subtitle">Mai 2021 - Juil 2022</div>
                </div>
                <div class="col droite">
                    <div class="description">Développement et optimisation de Prism 2.0.
                    Assistance dans le déploiement et la mise en œuvre de solutions.
                    Collaboration étroite avec les équipes pour garantir une performance optimale du produit.</div>
                </div>
                
    
        
            </div>
     
    </div>
    );
};

export default Container;