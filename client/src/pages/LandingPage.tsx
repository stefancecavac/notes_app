import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-14 flex items-center backdrop-blur-sm bg-stone-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700">
        <span className="ml-2 text-2xl font-bold bg-clip-text text-neutral-800">Notes_</span>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to={"/signup"} className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1 bg-neutral-100">
        <section className="w-full py-5 md:py-24 lg:py-32 xl:py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex items-center  justify-center gap-6  lg:gap-12 ">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 flex flex-col items-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-neutral-700">
                    Capture Your Thoughts, Anytime, Anywhere
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Notes_ is your digital notebook. Jot down ideas, create to-do lists, and organize your life with ease.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-primary hover:bg-primary/90 w-fit mx-auto">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full  ">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl mt-10 md:text-4xl text-center mb-12 bg-clip-text text-neutral-700">
              Features That Make Note-Taking a Breeze
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2">Intuitive Editor</h3>
                <p className="text-gray-500 dark:text-gray-400">Write, format, and organize your notes with our easy-to-use interface.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2">Cloud Sync</h3>
                <p className="text-gray-500 dark:text-gray-400">Access your notes from any device, anytime. Your thoughts are always with you.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                <p className="text-gray-500 dark:text-gray-400">Your notes are encrypted and securely stored. Your privacy is our priority.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12  ">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center  text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-neutral-700">
                  Ready to Start Taking Better Notes?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of users who have revolutionized their note-taking experience with Notes_.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 NoteWorthy. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4 hover:text-primary">Terms of Service</Link>
            <Link className="text-xs hover:underline underline-offset-4 hover:text-primary">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
