import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Home.js';
import ProfilePage from './Profil.js';
function App() {
    const [loggedIn, setLoggedIn]=useState(localStorage.getItem('token') || false);
    const [refreshKey, setRefreshKey] = useState(0);
    return (
      <Router>
        <Navbar refreshKey={refreshKey} setRefreshKey={setRefreshKey} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path={`/profile/:username`} element={<ProfilePage refreshKey={refreshKey} 
                                                                    setRefreshKey={setRefreshKey}
                                                                    loggedIn={loggedIn} 
                                                                    setLoggedIn={setLoggedIn}  />}></Route>
        </Routes>
      </Router>
    );
  }
  
  export default App;