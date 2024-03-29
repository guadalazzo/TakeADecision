import React, { useEffect, useState } from "react";
import axios from "axios";
import Argument from "../../components/Argument";
import { Loading } from "../../components/Loading";
import { LOCAL_URI } from "../../constants";
import "./styles.scss";

function Dilemmas(props) {
  const [dilemmas, setDilemmas] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = () => {
    props.history.push("/new-dilemma");
  };

  const openDetail = (id) => {
    setLoading(false);
    props.history.push(`/dilemma/${id}`);
  };
  useEffect(() => {
    axios.get(`${LOCAL_URI}/dilemmas`).then((response) => {
      setDilemmas(response.data);
      setLoading(false);
      return response.data;
    });
  }, []);
  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <h1>Your Dilemmas</h1>
          </header>
          <div className="dilemmas">
            {dilemmas &&
              dilemmas.map((dilemma, index) => {
                const type =
                  dilemma.totalPro > dilemma.totalCons ? "pro" : "cons";
                return (
                  <Argument
                    key={index.toString()}
                    text={dilemma.title}
                    type={type}
                    id={dilemma._id}
                    setDilemmas={setDilemmas}
                    openDetail={openDetail}
                  />
                );
              })}
          </div>
          <button onClick={handleClick}>New Decision</button>
        </>
      )}
    </div>
  );
}

export default Dilemmas;
