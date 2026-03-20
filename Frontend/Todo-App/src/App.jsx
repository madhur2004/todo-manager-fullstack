import AppRoutes from "./routes/AppRoutes";
import "./App.css";
function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
