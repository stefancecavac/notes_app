import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { userData, userSchema } from "../dataTypes";
import { UseAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { handleSubmit, register } = useForm<userData>({
    resolver: zodResolver(userSchema),
  });
  const { login } = UseAuthContext();

  const handleLogin = (data: userData) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-100 to-gray-200 ">
      <div className="backdrop-blur-xs bg-white/80 shadow-xl border border-gray-200 rounded-lg p-8 w-2/6">
        <div className="space-y-1 pb-8">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4"></div>
          <div className="text-3xl font-bold text-center text-gray-800">Welcome Back</div>
          <div className="text-center text-gray-600">Enter your crendentials to access your account</div>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-5">
            <label className=" flex flex-col gap-1">
              Email
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="john@example.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-gray-400 bg-gray-100 p-2 rounded-lg"
              />
            </label>
            <label className=" flex flex-col gap-1">
              Password
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
                className="transition-all duration-200 focus:ring-2 focus:ring-gray-400 bg-gray-100 p-2 rounded-lg"
              />
            </label>
          </div>
          <div className="flex flex-col mt-10 gap-2">
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Login
            </button>
            <div className="flex justify-between items-center">
              <Link to="/forgotpassword" className="text-gray-500">
                Forgot password?
              </Link>
              <Link to="/signup" className="text-black hover:text-gray-700 font-medium hover:underline transition-colors duration-200">
                Create account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
