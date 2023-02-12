import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { Loading } from "./../../components/Loading";
function App(props) {
  const [hasDilemmas, setHasDilemma] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3005/dilemmas").then((response) => {
      setHasDilemma(response.data.length !== 0);
      setLoading(false);
      return response.data;
    });
  }, []);

  const handleClick = () => {
    return !hasDilemmas
      ? props.history.push("/new-dilemma")
      : props.history.push("/dilemmas");
  };
  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : (
        <header className="App-header">
          <section className="arrows">
            <img src="/images/arrows.png" alt="logo" />
          </section>
          <button onClick={handleClick}>New Decision</button>
        </header>
      )}
    </div>
  );
}

export default App;
