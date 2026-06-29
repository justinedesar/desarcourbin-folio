import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  linkedin_url: z.string().trim().url().max(300),
  company: z.string().trim().url().max(200),
  funding_stage: z.string().max(60).optional().nullable(),
  team_size: z.string().max(60).optional().nullable(),
  sector: z.string().max(200).optional().nullable(),
  target_market: z.string().max(200).optional().nullable(),
  mission_type: z.array(z.string().max(60)).max(10).optional().default([]),
  engagement: z.string().max(60).optional().nullable(),
  duration: z.string().max(60).optional().nullable(),
  start_date: z.string().max(60).optional().nullable(),
  budget: z.string().max(120).optional().nullable(),
  context: z.string().trim().min(1).max(4000),
  objective: z.string().max(2000).optional().nullable(),
  success_criteria: z.string().max(2000).optional().nullable(),
  language: z.enum(["en", "fr", "es"]).default("en"),
});

export async function submitContact(data: unknown): Promise<{ ok: boolean }> {
  const validated = schema.parse(data);
  const { error } = await supabase.from("contact_submissions").insert(validated);
  if (error) {
    console.error("contact_submissions insert error:", error);
    throw new Error("Failed to submit");
  }

  // Fire-and-forget — DB insert already succeeded; don't block UX on email
  supabase.functions
    .invoke("notify-contact", { body: validated })
    .catch((e) => console.warn("[notify-contact] email notification failed:", e));

  return { ok: true };
}
