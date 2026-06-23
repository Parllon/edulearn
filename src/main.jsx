import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import './styles/index.css';
import { seedDefaultUser } from './services/auth';

seedDefaultUser();
createRoot(document.getElementById('root')).render(<App />);
