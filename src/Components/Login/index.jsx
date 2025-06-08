import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosUserInstance } from "../../Constants/axios";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const GenerateError = (err) => {
    toast.error(err, {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };
  //   const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = value;
      if (!email) {
        GenerateError("Email cannot be null");
      } else if (!password) {
        GenerateError("Password cannot be null");
      } else {
        setLoading(true);
        console.log(loading);
        const { data } = await axiosUserInstance.post("/login", {
          ...value,
        });
        console.log(data);

        setLoading(false);
        console.log(data);
        if (data.response) {
          toast(data.response.data.alert);
        }
        if (data.status) {
          localStorage.setItem("userInfo", JSON.stringify(data));
          localStorage.setItem("token", data.token);
          navigate("/allUsers");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center w-full justify-center !bg-[#F7941D]">
      <Card color="transparent" shadow={false}>
        <div className="justify-center flex items-center flex-col">
          <img src="/images/logo.svg" alt="Logo" />
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>
        </div>
        <form
          className="mt-9 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="black" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              placeholder="Enter your email"
              value={value.email}
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              className="!border-white text-white placeholder-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="black" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              value={value.password}
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              placeholder="Enter your password"
              className=" !border-white text-white placeholder-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Typography color="white" className="mt-6 text-center font-normal">
            Dont have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </a>
          </Typography>
          <div className="flex justify-center">
            <Button
              className="mt-6 w-5/6 bg-white text-black hover:bg-gray-200 normal-case text-base"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
