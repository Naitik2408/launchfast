"use client";

import { useState } from "react";
import { createBrowserClient } from "@repo/auth";
import { Button } from "@repo/ui";

interface ProfileFormProps {
  initialName: string;
  email: string;
}

export default function ProfileForm({ initialName, email }: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialName);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage({ text: "You must be signed in.", success: false });
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) {
      setMessage({ text: error.message, success: false });
    } else {
      setMessage({ text: "Profile updated successfully!", success: true });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      {message && (
        <div
          className={`p-3 text-xs rounded-lg border ${
            message.success
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Email Address (Read-only)</label>
        <input
          type="email"
          disabled
          value={email}
          className="w-full px-3 py-2 text-sm bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-500 cursor-not-allowed"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Full Name</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </div>

      <Button type="submit" disabled={loading} size="sm">
        {loading ? "Saving Changes..." : "Save Changes"}
      </Button>
    </form>
  );
}
