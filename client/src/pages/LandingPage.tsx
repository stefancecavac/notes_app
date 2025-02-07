import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-tr from-neutral-200 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-14 flex items-center backdrop-blur-sm bg-stone-100 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700">
        <span className="ml-2 text-2xl font-bold bg-clip-text text-neutral-800">Notes_</span>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to={"/signup"} className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-32 mx-auto">
        <section className="w-full  px-52 ">
          <div className="container mx-auto">
            <div className="flex items-center  justify-center  ">
              <div className="flex flex-col justify-center ">
                <div className=" flex flex-col items-center justify-center gap-5">
                  <h1 className="text-6xl font-bold tracking-tighter  text-center text-neutral-700">Capture Your Thoughts, Anytime, Anywhere</h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Notes_ is your digital notebook. Jot down ideas, create to-do lists, and organize your life with ease.
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-10  mx-auto">
                  <Link
                    to={"/signup"}
                    className="bg-gradient-to-r font-medium  border-2 hover:from-neutral-50 hover:to-neutral-200 hover:text-neutral-700 transition-all from-neutral-700 to-neutral-800 p-2 rounded-lg text-white w-fit"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
