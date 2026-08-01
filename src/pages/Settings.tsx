import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Settings = () => {
  const [name, setName] = useState("Totok Michael");
  const [email, setEmail] = useState("tmicheal20@mail.com");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <MainLayout>
      <PageHeader
        title="Settings"
        subtitle="Manage your account settings."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-5 text-xl font-semibold">
            Profile Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3"
              />
            </div>

            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 text-xl font-semibold">
            Preferences
          </h2>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <h3 className="font-semibold">
                Email Notifications
              </h3>

              <p className="text-sm text-slate-500">
                Receive project updates
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;