import { X } from "lucide-react";

import { Link } from "@ui/link";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="flex items-center gap-x-2 animate-bounce">
        <h1 className="text-4xl font-bold">Not Found</h1>
        <X className="w-10 h-10 text-red-500" strokeWidth={2} />
      </div>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 text-blue-500 hover:text-blue-700">
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFound;
