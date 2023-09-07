import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/Home/Home";
import { Footer } from "./components/footer/Footer";
import { Products } from "./components/Products/Products";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { About } from "./components/About/About";
import { Form } from "./components/Form/Form";
import { Detail } from "./components/Detail/Detail";
import { ContactUs } from "./components/ContactUs/ContactUs";
import { Landing } from "./components/Landing/Landing";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
import { WhisList } from "./components/Whislist/Whislist";
import { useDispatch } from "react-redux";
import { authData, logout } from "./redux/action";
import decode from "jwt-decode";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { OrderSection } from "./components/Dashboard/OrderSection/OrderSection";
import { DashboardLayout } from "./components/Dashboard/DashboardLayout";
import { MainDash } from "./components/Dashboard/MainDash/MainDash";
import { CustomerSection } from "./components/Dashboard/CustomerSection/CustomerSection";
import { ProductSection } from "./components/Dashboard/ProductSection/ProductSection";
import AnalyticSection from "./components/Dashboard/AnalyticSection/AnalyticSection";
import { UndoPurchaseForm } from "./components/UndoPurchaseForm/UndoPurchaseForm";
import { NotFound404 } from "./components/NotFound404/NotFound404";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) {
      const decodedToken = decode(storedProfile?.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout);
      else dispatch(authData(storedProfile));
    }
  }, [dispatch]);

  return (
    /*Estilos para el scroll-bar, pendiente de modularizar*/
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/dashboard/orders" &&
        location.pathname !== "/dashboard/customers" &&
        location.pathname !== "/dashboard/products" &&
        location.pathname !== "/dashboard/analytics" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/login/:verificado?" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/form"
          element={
            userLogged && userLogged.user?.id === 1 ? <Form /> : <NotFound404 />
          }
        />
        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/wishlist" element={<WhisList />} />
        <Route
          path="/dashboard"
          element={
            userLogged && userLogged.user?.id === 1 ? (
              <DashboardLayout>
                <MainDash />
              </DashboardLayout>
            ) : (
              <NotFound404 />
            )
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            userLogged && userLogged.user?.id === 1 ? (
              <DashboardLayout>
                <OrderSection />
              </DashboardLayout>
            ) : (
              <NotFound404 />
            )
          }
        />
        <Route
          path="/dashboard/customers"
          element={
            userLogged && userLogged.user?.id === 1 ? (
              <DashboardLayout>
                <CustomerSection />
              </DashboardLayout>
            ) : (
              <NotFound404 />
            )
          }
        />
        <Route
          path="/dashboard/products"
          element={
            userLogged && userLogged.user?.id === 1 ? (
              <DashboardLayout>
                <ProductSection />
              </DashboardLayout>
            ) : (
                <NotFound404 />
            )
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            userLogged && userLogged.user?.id === 1 ? (
              <DashboardLayout>
                <AnalyticSection />
              </DashboardLayout>
            ) : (
              <NotFound404 />
            )
          }
        />
        <Route path="/undo-purchase" element={<UndoPurchaseForm />} />
        <Route
          path="/profile"
          element={userLogged ? <UserProfile /> : <NotFound404 />}
        />
      </Routes>
      {location.pathname !== "/" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/dashboard/orders" &&
        location.pathname !== "/dashboard/customers" &&
        location.pathname !== "/dashboard/products" &&
        location.pathname !== "/dashboard/analytics" && <Footer />}
    </>
  );
}

export default App;
