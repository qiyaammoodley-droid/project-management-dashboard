import { useState } from "react";
import { UserPlus, Mail, Shield, X } from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";

const initialTeam = [
  { id: 1, name: "Noluthando Molui", role: "AI Engineer", email: "noluthando@donezo.com" },
  { id: 2, name: "Qiyaam Moodley", role: "AI Engineer", email: "qiyaam@donezo.com" },
  { id: 3, name: "Nyiko Vumani", role: "AI Engineer", email: "nyiko@donezo.com" },
  { id: 4, name: "Thandokuhle Maphanga", role: "AI Engineer", email: "thandokuhle@donezo.com" },
  { id: 5, name: "Tswarelo Madonsela", role: "AI Engineer", email: "tswarelo@donezo.com" },
];

const Team = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("AI Engineer");
  const [email, setEmail] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
    };

    setTeamMembers([newMember, ...teamMembers]);
    setName("");
    setEmail("");
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Team Members"
        subtitle="Manage your team and assign roles for your projects."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus size={16} />
            Add Member
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-slate-400" />
                <span>Active Member</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add New Team Member</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@donezo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Team;