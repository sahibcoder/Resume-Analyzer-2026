"use client";

import { useEffect, useState } from "react";

export default function ResumeResultPage() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const result = localStorage.getItem("resumeAnalysis");

  //   if (result) {
  //     setData(JSON.parse(result));
  //   }
  // }, []);

  useEffect(() => {
  const result = localStorage.getItem("resumeAnalysis");

  if (result) {
    setData(JSON.parse(result));

    // CLEANUP AFTER LOAD
    localStorage.removeItem("resumeAnalysis");
  }
}, []);

  if (!data) {
    return (
      <div className="p-10 text-center">
        No analysis found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Score */}
      <div className="p-6 rounded-xl border bg-white shadow">
        <h1 className="text-2xl font-bold">
          ATS Score: {data.atsScore}/100
        </h1>

        <p className="text-gray-600 mt-2">
          Match: {data.matchPercentage}%
        </p>
      </div>

      {/* Summary */}
      <div className="p-6 border rounded-xl">
        <h2 className="font-semibold text-lg">Summary</h2>
        <p className="text-gray-700 mt-2">{data.summary}</p>
      </div>

      {/* Strengths */}
      <div className="p-6 border rounded-xl">
        <h2 className="font-semibold text-lg text-green-600">
          Strengths
        </h2>

        <ul className="list-disc ml-6 mt-2">
          {data.strengths.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Missing Keywords */}
      <div className="p-6 border rounded-xl">
        <h2 className="font-semibold text-lg text-red-600">
          Missing Keywords
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {data.missingKeywords.map((k, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Improvements */}
      <div className="p-6 border rounded-xl">
        <h2 className="font-semibold text-lg text-blue-600">
          Improvements
        </h2>

        <ul className="list-disc ml-6 mt-2">
          {data.improvements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Final Verdict */}
      <div className="p-6 border rounded-xl bg-gray-50">
        <h2 className="font-semibold text-lg">
          Final Verdict
        </h2>
        <p className="mt-2 text-gray-700">
          {data.finalVerdict}
        </p>
      </div>

    </div>
  );
}