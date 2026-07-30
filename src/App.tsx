import AppRouter from "./routes/AppRouter";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <AppRouter />
    </TaskProvider>
  );
}

export default App;