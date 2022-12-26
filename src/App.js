import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//hooks
import { useAuthContext } from './hooks/useAuthContext';

//pages, components
import { Home, Create, Profile, Signup, Login, Post, UserProfile } from './pages';
//styles
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className='App font-ubuntu'>
      {authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route
              path='/create'
              element={user ? <Create /> : <Navigate to='/login' />}
            />
            <Route
              path='/profile'
              element={user ? <Profile /> : <Navigate to='/login' />}
            />

            <Route
              path='/post/:id'
              element={user ? <Post /> : <Navigate to='/login' />}
            />
            <Route
              path='/profile/:id'
              element={user ? <UserProfile /> : <Navigate to='/login' />}
            />
            <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
            <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
