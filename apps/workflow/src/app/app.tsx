// Uncomment this line to use CSS modules
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import NavBar from './other/NavBar';
import Products from './products/Product';
import ProductDetails from './products/ProductDetails';

export function App() {
  return (
    <>
			<NavBar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
