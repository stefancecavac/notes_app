import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="backdrop-blur-sm bg-white/80 shadow-xl border border-gray-200 rounded-lg p-8 w-2/6 h-3/4">
        <div className="space-y-1 pb-8">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4"></div>
          <div className="text-3xl font-bold text-center text-gray-800">Join Us</div>
          <div className="text-center text-gray-600">Create your account and get started</div>
        </div>
        <form>
          <div className="flex flex-col gap-5">
            <label className=" flex flex-col gap-1">
              Email
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-gray-400 bg-gray-100 p-2 rounded-lg"
              />
            </label>
            <label className=" flex flex-col gap-1">
              Password
              <input
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
              Create Account
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-black hover:text-gray-700 font-medium hover:underline transition-colors duration-200">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
