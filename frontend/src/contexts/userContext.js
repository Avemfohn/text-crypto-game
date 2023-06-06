import React, { useState } from 'react';

const UserContext = React.createContext({
    
});

export const UserContextProvider = (props) => {
    const [firstPlayerName, setFirstPlayerName] = useState("");
    const [secondPlayerName, setSecondPlayerName] = useState("");
    const [firstPlayerScore, setFirstPlayerScore] = useState(0);
    const [secondPlayerScore, setSecondPlayerScore] = useState(0);

    

    return <UserContext.Provider value={[firstPlayerName, setFirstPlayerName, secondPlayerName, setSecondPlayerName, firstPlayerScore, setFirstPlayerScore, secondPlayerScore, setSecondPlayerScore]}>{props.children}</UserContext.Provider>
};

export default UserContext;
