import { useEffect } from "react";
import "./App.css";

import axios from "axios";

function App() {
  useEffect(() => {
    axios.get().then((res) => {
      console.log(res.data);
    });
  }, []);

  return <div className="App">App</div>;
}

export default App;
