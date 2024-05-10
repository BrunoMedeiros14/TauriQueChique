import { router } from "@/routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    // </QueryClientProvider>
  );
}
