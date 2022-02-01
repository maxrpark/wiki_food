import './styles/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// nav
import Navbar from './components/Navbar';
// pages
import Home from './pages/Home';
import Categories from '././pages/Categories';
import SinglePlate from '././pages/SinglePlate';
import SearchPage from '././pages/SearchPage';
import RandomPage from './pages/RandomPage';
import Country from '././pages/Country';
import Category from '././pages/Category';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/single-plate/:id' element={<SinglePlate />} />
          <Route path='/search/:id' element={<SearchPage />} />
          <Route path='/random-menu' element={<RandomPage />} />
          <Route path='/category/:id' element={<Category />} />
          <Route path='/country/:id' element={<Country />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
