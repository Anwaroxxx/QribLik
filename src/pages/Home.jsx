import Sidebar from "../components/sidebar";
import React from 'react';
import MainFeed from '../components/Feed';

function Home() {
    return (
        <div>
            <Sidebar/>
            <MainFeed/>
        </div>
    );
}

export default Home;
