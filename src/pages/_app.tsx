import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import HeaderComponent from "@/components/HeaderComponent/Header";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import FooterComponent from "@/components/FooterComponent/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <HeaderComponent />
          <main>
            <Component {...pageProps}></Component>
          </main>
          <FooterComponent />
          <ReactQueryDevtools></ReactQueryDevtools>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
