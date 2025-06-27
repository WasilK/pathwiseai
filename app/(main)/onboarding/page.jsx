import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage({ searchParams }) {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect(searchParams.redirectTo || "/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} redirectTo={searchParams.redirectTo}/>
    </main>
  );
}
