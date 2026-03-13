import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <div style={{ color: 'white', padding: '4rem', textAlign: 'center' }}>
            <h1>Dashboard Work in Progress!</h1>
            <p>You have successfully logged in.</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
