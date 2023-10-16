import React from 'react';
import Header from '../components/Header'
import Body from '../components/Body'
import Container from '../components/Container';
import Langage from '../components/Langage';

const Home = () => {
    return (
        <div>
            <Header />
            <Body/>
            <Container />
            <Langage />
        </div>
    );
};

export default Home;