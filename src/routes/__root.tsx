import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import "@/i18n";
import "../styles.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-text mb-4">404</h1>
        <a href={import.meta.env.BASE_URL} className="text-accent hover:underline">
          ← Home
        </a>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}
