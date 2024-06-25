import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./providers/cartProvider";
import routes from "./routes/routes";

const App = (): JSX.Element => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />} // השתמש ב'element' במקום 'component'
            />
          ))}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
