import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message = "Something went wrong. Please try again." }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Oops!</h2>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorMessage;

