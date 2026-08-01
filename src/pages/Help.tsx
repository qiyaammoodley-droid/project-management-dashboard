import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const faqs = [
  {
    question: "How do I create a project?",
    answer: "Go to the Projects page and click 'Add Project'.",
  },
  {
    question: "How do I assign tasks?",
    answer: "Open a task and choose a team member from the assignee field.",
  },
  {
    question: "How do I track project progress?",
    answer: "Use the Dashboard and Analytics pages to monitor project progress.",
  },
  {
    question: "How do I contact support?",
    answer: "Email support@donezo.com.",
  },
];

const Help = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Help Centre"
        subtitle="Frequently asked questions."
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
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Help;