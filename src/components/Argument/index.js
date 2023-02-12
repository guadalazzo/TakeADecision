import React from "react";
import axios from "axios";
import "./styles.scss";
const Argument = (props) => {
  const { text, type, id, setDilemmas, openDetail } = props;
  const deleteDilemma = () => {
    axios.delete(`http://localhost:3005/dilemma/${id}`).then(() => {
      axios.get(`http://localhost:3005/dilemmas`).then((response) => {
        return setDilemmas(response.data);
      });
    });
  };

  return (
    <section className={`argument-container ${type}-arg`}>
      {id && <span onClick={deleteDilemma}>eliminar</span>}
      <p>{text}</p>
      {id && <span onClick={openDetail.bind(this, id)}>editar</span>}
    </section>
  );
};
export default Argument;
