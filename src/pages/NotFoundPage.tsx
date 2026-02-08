import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-2xl font-bold text-warm-900">Page not found</h1>
      <p className="mt-2 text-warm-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-warm-700 underline hover:text-warm-900"
      >
        Back to recipes
      </Link>
    </div>
  );
}
