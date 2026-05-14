import { useState } from "react";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Chat />
      ) : showRegister ? (
        <Register
          setIsLoggedIn={setIsLoggedIn}
          setShowRegister={setShowRegister}
        />
      ) : (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setShowRegister={setShowRegister}
        />
      )}
    </>
  );
}

export default App;