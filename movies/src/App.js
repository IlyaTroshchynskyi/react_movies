import {RouterProvider} from "react-router-dom";
import router from "./appRouter";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./http_queries/client";


function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
  );
}

export default App;
