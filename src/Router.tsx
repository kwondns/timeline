import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

import Layout from './pages/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <span>잘못된 요청입니다.</span>,
    children: [
      { index: true, element: <Navigate to="/past" replace /> },
      {
        path: 'past',
        async lazy() {
          const { Past, pastLoader } = await import('./pages/Past');
          return {
            Component: () => (
              <Suspense>
                <Past />
              </Suspense>
            ),
            loader: pastLoader(queryClient),
          };
        },
      },
      {
        path: 'past-calendar',
        async lazy() {
          const { PastCalendar, pastCalendarLoader } = await import('./pages/PastCalendar');
          return {
            Component: () => (
              <Suspense>
                <PastCalendar />
              </Suspense>
            ),
            loader: pastCalendarLoader(queryClient),
          };
        },
      },
      {
        path: 'present',
        async lazy() {
          const { Present, presentLoader } = await import('./pages/Present');
          return {
            Component: () => (
              <Suspense>
                <Present />
              </Suspense>
            ),
            loader: presentLoader(queryClient),
          };
        },
      },
      {
        path: 'future',
        async lazy() {
          const { Future, futureLoader } = await import('./pages/Future');
          return {
            Component: () => (
              <Suspense>
                <Future />
              </Suspense>
            ),
            loader: futureLoader(queryClient),
          };
        },
      },
      {
        path: 'future-record',
        async lazy() {
          const { FutureRecord, futureRecordLoader } = await import('./pages/FutureRecord');
          return {
            Component: () => (
              <Suspense>
                <FutureRecord />
              </Suspense>
            ),
            loader: futureRecordLoader(queryClient),
          };
        },
      },
    ],
  },
  {
    path: 'auth',
    async lazy() {
      const { Auth } = await import('./pages/Auth');
      return {
        Component: () => (
          <Suspense>
            <Auth />
          </Suspense>
        ),
      };
    },
  },
]);

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
