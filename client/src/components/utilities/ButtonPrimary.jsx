const ButtonPrimary = ({ children, style, click, disabled }) => {
  return (
    <button
      style={{ ...style }}
      className="button"
      onClick={click}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};
export default ButtonPrimary;
