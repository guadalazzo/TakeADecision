import React from "react";
import axios from "axios";
import { LOCAL_URI } from "../../constants";
import "./styles.scss";
const Argument = (props) => {
  const { text, type, id, setDilemmas, openDetail } = props;
  const deleteDilemma = () => {
    axios.delete(`${LOCAL_URI}/dilemma/${id}`).then(() => {
      axios.get(`${LOCAL_URI}/dilemmas`).then((response) => {
        return setDilemmas(response.data);
      });
    });
  };

  return (
    <section className={`argument-container ${type}-arg`}>
      {id && (
        <span className="btn btn-delete" onClick={deleteDilemma}>
          DELETE
        </span>
      )}
      <p>{text}</p>
      {id && (
        <span className="btn btn-edit" onClick={openDetail.bind(this, id)}>
          EDIT
        </span>
      )}
    </section>
  );
};
export default Argument;
