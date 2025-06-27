import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function ResumePage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  if (!isOnboarded) {
    redirect("/onboarding?redirectTo=/resume");
  }
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
