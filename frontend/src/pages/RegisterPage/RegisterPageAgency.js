import React, { useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPageAgency = () => {
  const { registerAgency } = useContext(AuthContext);
  const defaultValues = { name: "", email: "", password: "", isAdmin: false };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerAgency
  );

  const filePickerRef = useRef();

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Picture:{" "}
          <input
            type="file"
            name="image"
            ref={filePickerRef}
            accept=".jpg,.jpeg,.png"
            onChange={handleInputChange}
            className="form-control"
          />
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            width: "20%",
          }}
        >
          Admin:{" "}
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleInputChange}
          />
        </label>
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPageAgency;