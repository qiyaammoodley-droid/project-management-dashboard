import AppRouter from "./routes/AppRouter";
import { ProfileProvider } from "./context/ProfileContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <ProfileProvider>
      <ProjectProvider>
        <TaskProvider>
          <AppRouter />
        </TaskProvider>
      </ProjectProvider>
    </ProfileProvider>
  );
}

export default App;