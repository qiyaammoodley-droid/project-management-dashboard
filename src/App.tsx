import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import { project } from "./data/mockData";
import "./App.css";

// This shell renders Member 3's (Tshwarelo Madonsela's) Project Details
// module standalone, so it can be reviewed and run on its own. In the
// merged group app, <ProjectDetails /> plugs into the shared router/layout
// alongside the other members' pages (project list, task board, etc.).
function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__mark" aria-hidden="true" />
          <span>Nexus</span>
        </div>
        <nav className="app-header__nav">
          <span className="app-header__nav-item">Projects</span>
          <span className="app-header__nav-item app-header__nav-item--active">
            Project Details
          </span>
          <span className="app-header__nav-item">Tasks</span>
          <span className="app-header__nav-item">Team</span>
        </nav>
      </header>

      <main className="app-main">
        <ProjectDetails project={project} />
      </main>
    </div>
  );
}

export default App;
