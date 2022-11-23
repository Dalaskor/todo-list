import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <AppRouter />
      </>
    </BrowserRouter>
  );
}

export default App;
