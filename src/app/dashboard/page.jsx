import { FileText, BarChart3, CheckCircle, XCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-indigo-600">Resume Analyzer</h1>

        <button className="rounded-lg bg-red-500 px-5 py-2 text-white">
          Logout
        </button>
      </nav>

      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Welcome Sahib 👋</h2>

          <p className="text-gray-600 mt-2">
            Analyze your resume and improve ATS score
          </p>
        </div>

        {/* Upload Resume Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Upload Resume</h3>

          <div className="rounded-xl border-2 border-dashed border-indigo-400 p-10 text-center">
            <FileText size={50} className="mx-auto text-indigo-600" />

            <p className="mt-4 text-gray-600">Drag & Drop Resume Here</p>

            <button className="mt-5 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
              Choose File
            </button>
          </div>
        </div>

        {/* Score Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow">
            <BarChart3 className="text-indigo-600" size={35} />

            <h4 className="mt-4 text-xl font-bold">ATS Score</h4>

            <p className="mt-2 text-3xl font-bold text-green-500">82%</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <CheckCircle className="text-green-500" size={35} />

            <h4 className="mt-4 text-xl font-bold">Skills Found</h4>

            <p className="mt-2 text-3xl font-bold">15</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <XCircle className="text-red-500" size={35} />

            <h4 className="mt-4 text-xl font-bold">Missing Skills</h4>

            <p className="mt-2 text-3xl font-bold">5</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <FileText className="text-blue-500" size={35} />

            <h4 className="mt-4 text-xl font-bold">Experience</h4>

            <p className="mt-2 text-2xl font-bold">Intermediate</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Matched Skills */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="text-2xl font-bold text-green-600">
              Matched Skills
            </h3>

            <ul className="mt-4 space-y-2">
              <li>✅ React</li>
              <li>✅ Next.js</li>
              <li>✅ Tailwind CSS</li>
            </ul>
          </div>

          {/* Missing Skills */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="text-2xl font-bold text-red-500">Missing Skills</h3>

            <ul className="mt-4 space-y-2">
              <li>❌ Node.js</li>
              <li>❌ MongoDB</li>
              <li>❌ Docker</li>
            </ul>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow">
          <h3 className="text-2xl font-bold">Suggestions</h3>

          <ul className="mt-4 space-y-3 text-gray-700">
            <li>• Add more project details</li>
            <li>• Improve summary section</li>
            <li>• Add measurable achievements</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
