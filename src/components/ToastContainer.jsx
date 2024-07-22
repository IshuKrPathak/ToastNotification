import { useRef, useState } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timerRef = useRef({});

  const handleClose = (id) => {
    clearTimeout(timerRef.current[id]);
    delete timerRef.current[id];
    setToasts((prevToasts) => {
      const filterArr = prevToasts.filter((toasts) => {
        return toasts.id !== id;
      });
      return filterArr;
    });
  };

  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [...toasts, { id, message, type }];
    setToasts(newToasts);
    timerRef.current[id] = setTimeout(() => handleClose(id), 5000);
  };

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => {
          return (
            <div key={id} className={`toast ${type}`}>
              {message} <span onClick={() => handleClose(id)}>X</span>
            </div>
          );
        })}
      </div>

      <div className="btn-container">
        <button onClick={() => handleAdd("Success", "success")}>
          {" "}
          Success
        </button>
        <button onClick={() => handleAdd("Info", "info")}>Info</button>
        <button onClick={() => handleAdd("Warning", "warning")}>
          {" "}
          Warning
        </button>
        <button onClick={() => handleAdd("Error", "error")}>Error</button>
      </div>
    </div>
  );
}
