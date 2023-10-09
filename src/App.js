import './App.css';
import Users from './views/dashboard/dashboard';
import UserLogin from './views/login/login';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/users" element={<Users username={username} loggedIn={true} setLoggedIn={setLoggedIn}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
