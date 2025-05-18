import { cn } from "@utils/cn";

import { SlashIcon } from "@assets/svgs";

import { Link } from "./link";

interface BreadCrumb {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  className?: string;
  breadcrumbs: BreadCrumb[];
  selectedBreadcrumb: BreadCrumb | null;
}

const Breadcrumb = ({
  className,
  breadcrumbs,
  selectedBreadcrumb,
}: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ", className)}
    >
      <ol role="list" className="flex items-center space-x-4">
        {breadcrumbs.map((breadcrumb, idx) => (
          <li key={idx}>
            <div className="flex items-center">
              <Link
                href={breadcrumb.href}
                className="mr-4 capitalize text-sm font-medium text-gray-900"
              >
                {breadcrumb.name}
              </Link>
              {(idx !== breadcrumbs.length - 1 || !!selectedBreadcrumb) && (
                <SlashIcon className="h-5 w-auto text-gray-300" />
              )}
            </div>
          </li>
        ))}
        {selectedBreadcrumb && (
          <li className="text-sm">
            <Link
              href={selectedBreadcrumb.href}
              aria-current="page"
              className="font-medium capitalize text-gray-500 hover:text-gray-600"
            >
              {selectedBreadcrumb.name}
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
