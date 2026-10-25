import { getSessionUser } from "@/lib/auth";
import { Card } from "@repo/ui";
import ProfileForm from "./profile-form";

export default async function SettingsPage() {
  const session = await getSessionUser();
  const profile = session?.profile;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-sm text-neutral-500">Update your profile details and preferences.</p>
      </div>

      <Card>
        <ProfileForm initialName={profile?.full_name || ""} email={session?.user?.email || ""} />
      </Card>
    </div>
  );
}
