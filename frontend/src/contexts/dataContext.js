import React, { useState } from 'react';

const DataContext = React.createContext({
    
});

export const DataContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [levelScore, setLevelScore] = useState(0);
    const [levelMinute, setLevelMinute] = useState(0);
    const [levelSecond, setLevelSecond] = useState(0);



    return <DataContext.Provider value={[isLoggedIn, setIsLoggedIn, levelScore, setLevelScore, levelMinute, setLevelMinute, levelSecond, setLevelSecond]}>{props.children}</DataContext.Provider>
};

export default DataContext;
