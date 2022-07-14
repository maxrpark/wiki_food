import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// nav

import { Navbar, Footer } from "./components";
// pages
import {
    Home,
    Categories,
    Category,
    Country,
    SinglePlate,
    SearchPage,
    RandomPage,
} from "./pages";

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
                <Footer />
            </Router>
        </div>
    );
}

export default App;
