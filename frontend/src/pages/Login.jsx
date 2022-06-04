import { FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authActions, login } from "../features/auth/auth-silce";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isloadinge, isSuccesse, isError, message } = useSelector(
    (state) => state.auth
  );

  const { email, password } = formData;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccesse || user) {
      navigate("/");
    }

    dispatch(authActions.reset());
  }, [user, isSuccesse, isError, message, dispatch, navigate]);

  const handleOnchange = (e) => {
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  if (isloadinge) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and Start</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnchange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
