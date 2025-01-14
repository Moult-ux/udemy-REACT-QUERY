import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactElement } from "react";

import { queryClient } from "../../react-query/queryClient";
import { theme } from "../../theme";
import { Loading } from "./Loading";
import { Navbar } from "./Navbar";
import { Routes } from "./Routes";

export function App(): ReactElement {

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <Loading />
          <Routes />
          <ReactQueryDevtools />
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
