import style from "./Button.module.css";
import PropTypes from "prop-types";

export const Button = ({ onClick }) => {
  return (
    <button
      className={style.Button}
      type="button"
      onClick={(e) => {
        onClick(e);
      }}
    >
      {" "}
      Load More
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
