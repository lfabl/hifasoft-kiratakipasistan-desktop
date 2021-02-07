import React from 'react';

import {
    Link
} from 'react-router-dom';

const Home = () => {
    return <div>
        Home Page
        <Link
            to="/dashboard/login"
        >
            <div>Çıkış Yap</div>
        </Link>
    </div>;
};
export default Home;