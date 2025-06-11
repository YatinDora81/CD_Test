import React , {useState} from 'react'
import toast from 'react-hot-toast';

function App() {

  const [apiClick , setApiClick] = useState(0);

  const setCookieHandler = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BD_BASE_URL + "/", {
        method: "GET",
        credentials: "include", // Important for cookies
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setApiClick(apiClick + 1);
        toast.success(data)
      } else {
        console.error("Failed to set cookie")
        toast.error("Failed to set cookie but get response from bd");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error setting cookie");
    }
  };

  const checkCookieHandler = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BD_BASE_URL + "/check", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message);
      } else {
        console.error("Failed to check cookie" + data);
        toast.error("Failed to check cookie but get response from bd" + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error checking cookie");
    }
  };

  return (
    <div>
      
      <h1>API REQUEST IS {apiClick}</h1>
      <button style={{ marginTop: "20px" }} onClick={setCookieHandler}> SET COOKIE </button>
      <button style={{ marginTop: "20px" }} onClick={checkCookieHandler}> Check COOKIE </button>

    </div>
  )
}

export default App