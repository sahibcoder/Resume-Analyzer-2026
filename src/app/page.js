import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold text-indigo-700">
          Resume Analyzer
        </h1>

        <button className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-8 py-20 md:flex-row">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold leading-tight text-gray-900">
            Analyze Your Resume with AI
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Upload your resume and get instant AI-powered feedback,
            ATS score, skill suggestions, and improvements to land
            your dream job faster.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-700">
              Upload Resume
            </button>

            <button className="rounded-xl border border-indigo-600 px-6 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        {/* <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Resume Analysis"
            width={500}
            height={400}
            className="rounded-3xl shadow-2xl"
          />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-8">
          <h3 className="text-center text-4xl font-bold text-gray-900">
            Features
          </h3>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            
            {/* Card 1 */}
            <div className="rounded-2xl bg-gray-50 p-8 shadow-md transition hover:shadow-xl">
              <h4 className="text-2xl font-semibold text-indigo-600">
                ATS Score
              </h4>

              <p className="mt-4 text-gray-600">
                Get an instant ATS compatibility score for your resume.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-gray-50 p-8 shadow-md transition hover:shadow-xl">
              <h4 className="text-2xl font-semibold text-indigo-600">
                Skill Analysis
              </h4>

              <p className="mt-4 text-gray-600">
                Identify missing skills and improve your chances of selection.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-gray-50 p-8 shadow-md transition hover:shadow-xl">
              <h4 className="text-2xl font-semibold text-indigo-600">
                AI Suggestions
              </h4>

              <p className="mt-4 text-gray-600">
                Receive smart recommendations to improve your resume.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 py-6 text-center text-white">
        <p>© 2026 Resume Analyzer. All rights reserved.</p>
      </footer>
    </main>
  );
}
