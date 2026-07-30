import AppRouter from "./routes/AppRouter";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <ProjectProvider>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </ProjectProvider>
  );
}

export default App;