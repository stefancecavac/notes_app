import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen bg-linear-to-tr from-base-210 to-base-300 ">
      <main className="flex-1 py-32 mx-auto">
        <section className="w-full  px-52 h-full">
          <div className="container mx-auto">
            <div className="flex items-center  justify-center  ">
              <div className="flex flex-col justify-center ">
                <div className=" flex flex-col items-center justify-center gap-5">
                  <h1 className="text-6xl font-bold tracking-tighter  text-center text-base-content">Capture Your Thoughts, Anytime, Anywhere</h1>
                  <p className="max-w-[600px] md:text-xl text-info-content mt-5">
                    Notes_ is your digital notebook. Jot down ideas, create to-do lists, and organize your life with ease.
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-30  mx-auto my-auto">
                  <Link to={"/signup"} className="btn btn-neutral btn-lg text-base-content  w-full">
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
