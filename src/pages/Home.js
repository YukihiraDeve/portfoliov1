import React from 'react';
import Header from '../components/Header'
import Body from '../components/Body'
import Container from '../components/Container';
import Langage from '../components/Langage';
import "../styles/App.css"

const Home = () => {
    return (
        <div>
            <div className="main-content">
                <Header />
                <Body/>
                <Container />
            </div>
    
            <Langage />
            
        </div>
    );
};

export default Home;