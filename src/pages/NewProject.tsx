import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import useProjects from "../hooks/useProjects";

const teamOptions = [
  "Noluthando Moloi",
  "Qiyaam Moodley",
  "Nyiko Vumani",
  "Thandokuhle Maphanga",
  "Tswarelo Madonsela",
];

const NewProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleCheckboxChange = (member: string) => {
    if (selectedTeam.includes(member)) {
      setSelectedTeam(selectedTeam.filter((m) => m !== member));
    } else {
      setSelectedTeam([...selectedTeam, member]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    setError("");

    addProject({
      name: name.trim(),
      description: description.trim(),
      deadline,
      status: "To Do",
      teamMembers: selectedTeam,
    });

    navigate("/projects");
  };

  return (
    <MainLayout>
      <PageHeader
        title="Add Project"
        subtitle="Create a project, assign your AI team, and add tasks under it"
      />

      <section className="max-w-2xl rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Project Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. AI Model Pipeline Revamp"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-emerald-100 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Briefly describe this project"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Deadline</span>
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>

          {/* Team Member Selection */}
          <div>
            <span className="mb-2 block text-sm font-medium text-slate-700">Assign Team Members</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl border border-emerald-100 p-3 bg-slate-50/50">
              {teamOptions.map((member) => (
                <label key={member} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTeam.includes(member)}
                    onChange={() => handleCheckboxChange(member)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  {member}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default NewProject;