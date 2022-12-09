import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import {
  EventsPage,
  Homepage,
  Login,
  SignUp,
  PostEvent,
  DetailsPage,
  OrderPage,
} from "./pages";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="whole-app">
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/postevent" element={<PostEvent />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
