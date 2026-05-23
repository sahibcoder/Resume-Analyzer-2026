import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white/10 p-10 text-center shadow-2xl backdrop-blur-lg border border-white/20">
        <h1 className="text-8xl font-extrabold text-white drop-shadow-lg">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>

        <p className="mt-4 text-lg text-gray-200">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/">
            <Button className="rounded-full px-6 py-6 text-base">
              <Home className="mr-2 h-5 w-5" />
              Back To Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
