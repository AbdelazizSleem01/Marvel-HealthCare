import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center px-4">
          <div className="font-display font-bold text-[150px] leading-none gradient-text opacity-20 select-none">
            404
          </div>
          <h1 className="font-display font-bold text-4xl text-text-dark -mt-8 mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-dark mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
