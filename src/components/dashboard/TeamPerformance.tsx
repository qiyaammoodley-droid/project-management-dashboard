import { Play } from "lucide-react";

import Card from "../ui/Card";

const TeamPerformance = () => {
  const startMeeting = () => {
    window.open("https://meet.google.com/new", "_blank");
  };

  return (
    <Card className="border-slate-200">
      <h2 className="text-2xl font-bold text-gray-900">
        Reminders
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Meeting with Arc Company
      </p>

      <p className="text-xs text-slate-400">
        Time : 02.00 pm - 04.00 pm
      </p>

      <div className="mt-5">
        <button
          onClick={startMeeting}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          <Play size={14} />
          Start Meeting
        </button>
      </div>
    </Card>
  );
};

export default TeamPerformance;