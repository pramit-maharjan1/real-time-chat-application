import { useState } from "react";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      {isLoggedIn ? (
        <Chat />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;