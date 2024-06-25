import BikeDetail from "../pages/bikeDetail";
import CartPage from "../pages/cartPage";
import HomePage from "../pages/home";
import ShopPage from "../pages/shop";
import Teacher from "../pages/teacher";
import Singup from "../pages/singup";
import Singin from "../pages/singin";
import ProductPage from "../pages/ProductPage"; // ייבוא עמוד המוצר
import ProfilePage from "../pages/profilepage";
import Recom from "../pages/recom"


const routes = [
  { path: "/course/:id?", component: ProductPage },
  { path: "/shop", component: ShopPage },
  { path: "/cart", component: CartPage },
  { path: "/teacher", component: Teacher },
  { path: "/singin", component: Singin },
  { path: "/", component: HomePage, exact: true },
  { path: "", component: ShopPage },
  { path: "/singup", component: Singup },
  { path: "/product/:id", component: ProductPage }, // תיקון התחביר
  { path: "/profile", component: ProfilePage }, // תיקון התחביר
  { path: "/reco", component: Recom }, // תיקון התחביר


];

export default routes;
