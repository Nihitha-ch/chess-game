import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import Layout from '../../components/layout';
import './home-styles.css';
import ShareButtons from '../../components/share-buttons';
import Button from '../../components/button';
import { useHistory, useLocation } from 'react-router-dom';

const Form = () => {
    const [name, setName] = useState('');
    const [gameID, setGameID] = useState('');
    const history = useHistory();
    const location = useLocation();

    const { id: inviteID } = qs.parse(location.search);

    useEffect(() => {
        if (inviteID) return setGameID(inviteID);
        const id = Math.random().toString().replace('0.', '');
        setGameID(id);
    }, [inviteID]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!(name && gameID)) {
            return;
        }
        history.push(`/game?name=${name}&id=${gameID}`);
    };

    return (
        <div>
            <h2>Play Chess with your friends online</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Display Name"
                />
                <div className="gameId">Game ID: {gameID}</div>
                <hr />
                <p className="invite">Invite your friend over</p>
                <ShareButtons
                    shareText={`${window.location.origin}?id=${gameID}`}
                    subject="Join me for a game of Chess on Stack Chess"
                />

                <Button onClick={handleSubmit}>Create</Button>
            </form>
        </div>
    );
};
const Home = () => {
    const Image = () => (
        <img src={require('../../assets/home.jpg')} alt="home" className="bg-img" />
    );
    return <Layout Content={Form} Image={Image} />;
};

export default Home;