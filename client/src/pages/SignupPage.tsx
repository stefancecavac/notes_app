import { useForm } from "react-hook-form";
import { userData, userSchema } from "../dataTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseAuthContext } from "../context/AuthContext";

const SignupPage = () => {
  const { handleSubmit, register } = useForm<userData>({
    resolver: zodResolver(userSchema),
  });
  const { login } = UseAuthContext();

  const handleLogin = (data: userData) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-2">
      <div className="backdrop-blur-sm bg-white/80 shadow-xl border border-gray-200 rounded-lg p-10 w-4/12 h-3/4">
        <div className="space-y-1 pb-8">
          <div className="size-16 bg-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 fill-white stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-3 items-center ">
            <p className="text-3xl font-bold text-center text-gray-800">Join Us</p>
            <p className="text-center text-neutral-500 font-medium text-sm">
              Enter your email to get started. We'll send you a magic link for a password-free sign up.
            </p>
          </div>
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
              className=" flex items-center gap-6 justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Send Magic Link
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
