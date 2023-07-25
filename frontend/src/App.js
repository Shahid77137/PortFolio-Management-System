import MainRoutes from './components/MainRoutes';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import { base }  from './Utils/post';


import './App.css';

function App() {
  return (
    <div className="App">
      <Home />
      <MainRoutes/>
      <ToastContainer />
    </div>
  );
}

export default App;
