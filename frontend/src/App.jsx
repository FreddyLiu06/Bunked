import {Routes, Route, BrowserRouter} from 'react-router-dom';
import FrontPage from './components/frontPage/FrontPage';
import Home from './components/home/Home';
import CreateBio from './components/create-bio/CreateBio';
import CreateBioPics from './components/create-bio-pics/CreateBioPics';

function App() {
  return (
    <Routes>
      <Route index element={<FrontPage />} />
      <Route path= "/home/*" element={<Home />} />
      <Route path = "/create-bio" element = {<CreateBio />} />
      <Route path = "/create-bio-pics" element = {<CreateBioPics />} />
    </Routes>
  );
};

export default App;
