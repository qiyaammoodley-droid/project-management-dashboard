import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const faqs = [
  {
    question: "How do I create a project?",
    answer: "Go to the Projects page and click 'Add Project'.",
    details:
      "Fill in the project name, description, deadline, and team members. Save it and it will appear in your project list instantly.",
  },
  {
    question: "How do I assign tasks?",
    answer: "Open a task and choose a team member from the assignee field.",
    details:
      "You can assign while creating a task or update status later from Task List. Tasks can also be linked to a specific project.",
  },
  {
    question: "How do I track project progress?",
    answer: "Use the Dashboard and Analytics pages to monitor project progress.",
    details:
      "Dashboard cards show key totals while Analytics gives trend visibility. Project status updates are reflected throughout the app.",
  },
  {
    question: "How do I contact support?",
    answer: "Email support@donezo.com.",
    details:
      "Include your project name, the page where the issue happened, and a short screenshot or error text so support can help faster.",
  },
  {
    question: "How do profile updates work?",
    answer: "Update your name and email from Settings and click Save Changes.",
    details:
      "After saving, the profile avatar and top-right profile details update immediately across the app.",
  },
];

const Help = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleReadMore = (question: string) => {
    setExpandedQuestion((current) => (current === question ? null : question));
  };

  return (
    <MainLayout>
      <PageHeader
        title="Help Centre"
        subtitle="Frequently asked questions. Click Read More to view full guidance."
      />

      <div className="space-y-5">
        {faqs.map((faq) => (
          <Card key={faq.question}>
            <h2 className="text-lg font-semibold">
              {faq.question}
            </h2>

            <p className="mt-2 text-slate-600">
              {faq.answer}
            </p>

            {expandedQuestion === faq.question ? (
              <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                {faq.details}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => toggleReadMore(faq.question)}
              className="mt-3 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {expandedQuestion === faq.question ? "Read Less" : "Read More"}
            </button>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Help;