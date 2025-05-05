import { authMiddleware } from '@auth0/nextjs-auth0/edge';

export default authMiddleware({
  // Rutas protegidas
  publicRoutes: ['/', '/api/public'],
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
