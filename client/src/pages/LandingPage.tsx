import { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import { useThemeChangerStore } from "../Stores/useThemeChangerStore";

export default function LandingPage() {
  const { darkMode, toggleTheme } = useThemeChangerStore();

  const { sendMagicLink } = UseAuthContext();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSendLink = () => {
    setEmailSent(true);
    sendMagicLink(email);
  };

  return (
    <div
      className={`${darkMode ? "tron-grid" : "tron-grid-light"} bg-gradient-to-b from-base-200 to-base-300 h-auto flex items-center justify-center  `}
    >
      <div className={`flex flex-col min-h-full items-center justify-center w-200 `}>
        <div className="p-3 px-5 flex justify-between items-center fixed top-0 left-0 right-0 bg-base-200/50 z-50 backdrop-blur-md ">
          <h1 className="text-primary font-bold text-2xl">Notes_</h1>
          <div className="flex items-center gap-5">
            <label className="swap swap-rotate hover:bg-neutral rounded">
              <input onChange={toggleTheme} checked={!darkMode} type="checkbox" />

              <svg className="swap-on size-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg className="swap-off size-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
        <main className="flex-1 flex flex-col">
          <section className="w-full py-12 md:py-24 lg:py-32 px-10">
            <div className="flex px-4 md:px-6">
              <div className="flex mx-auto items-center mt-20">
                {!emailSent ? (
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl text-base-content text-center font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Capture Your Thoughts, <span className="text-primary">Anytime, Anywhere</span>
                      </h1>
                      <p className="max-w-[600px] text-info-content md:text-xl text-center mt-10">
                        Notes_ is your digital notebook. Jot down ideas, create to-do lists, and organize your life with ease.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2  items-center mt-10 ">
                      <input onChange={(e) => setEmail(e.target.value)} className="input"></input>
                      <button onClick={() => handleSendLink()} className="btn btn-primary w-fit btn-lg">
                        Send magic link
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>Please check your email</p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
