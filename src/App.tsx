import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import { Suspense } from "react";
import { ProgressDemo } from "./components/Global/ProgressDemo";

function App() {
  const element = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen">
          <ProgressDemo />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export default App;
