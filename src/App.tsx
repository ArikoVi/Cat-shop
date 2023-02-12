import {Route, Routes} from 'react-router-dom'
import {ProductsPage} from './pages/ProductsPage'
import {ShoppingBasket} from './pages/ShoppingBasket'
import {Navigation} from './components/Navigation'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={ <ProductsPage /> } />
        <Route path="/about" element={
            <ShoppingBasket /> } />
      </Routes>
    </>
  )
}

export default App;
