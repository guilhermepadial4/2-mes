import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext';
import './styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </motion.div>
      </Router>
    </AuthProvider>
  );
}

export default App;