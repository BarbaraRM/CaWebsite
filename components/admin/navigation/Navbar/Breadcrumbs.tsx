'use client';

import { paths } from '@/store/routesList';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Breadcrumb {
  breadcrumb: string;
  href: string;
}

interface BreadcrumbsProps {
  currentPath: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ currentPath }) => {
  const router = useRouter(); // Usamos `useRouter` de next/navigation
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Desglosar el currentPath y mapear las partes a los breadcrumbs
  const pathParts = currentPath.split('/').filter(Boolean);

  // Generar los breadcrumbs basados en los pathParts
  const getBreadcrumbs = (): Breadcrumb[] => {
    let breadcrumbs: Breadcrumb[] = [];
    let pathAccumulator = "";
    
    // Recorremos las partes de la ruta y generamos los breadcrumbs
    pathParts.forEach((part, index) => {
      pathAccumulator += `/${part}`;

      // Buscar el breadcrumb correspondiente en la lista de paths
      const breadcrumbData = paths.find((path) => {
        // Usamos una expresión regular para verificar si el path contiene :id
        const regex = new RegExp(path.path.replace(':id', '([^/]+)'));
        return regex.test(pathAccumulator);
      });

      if (breadcrumbData) {
        breadcrumbs.push({
          breadcrumb: breadcrumbData.breadcrumb,
          href: breadcrumbData.href.replace(':id', part), // Reemplazar :id con la parte correspondiente
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            <a
              href={breadcrumb.href}
              onClick={(e) => {
                e.preventDefault();
                router.push(breadcrumb.href);  // Usamos `router.push` para la navegación
              }}
              className="text-dark hover:text-gray-800 text-base lg:text-xl font-bold"
            >
              {breadcrumb.breadcrumb}
            </a>
            {index < breadcrumbs.length - 1 && (
              <span className="pl-2">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
