// import { supabase } from "./supabase";
// import type { Survey, SurveyOption, OptionCount } from "../types/survey";

// // ---------- Surveys ----------

// export async function fetchActiveSurveys(): Promise<Survey[]> {
//   const { data, error } = await supabase
//     .from("surveys")
//     .select("*")
//     .eq("is_active", true)
//     .order("created_at", { ascending: false });

//   if (error) throw error;
//   return data as Survey[];
// }

// export async function fetchSurveyById(id: number): Promise<Survey> {
//   const { data, error } = await supabase
//     .from("surveys")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) throw error;
//   return data as Survey;
// }

// export async function fetchOptionsForSurvey(surveyId: number): Promise<SurveyOption[]> {
//   const { data, error } = await supabase
//     .from("options")
//     .select("*")
//     .eq("survey_id", surveyId)
//     .order("display_order", { ascending: true });

//   if (error) throw error;
//   return data as SurveyOption[];
// }

// export async function fetchOptionCounts(surveyId: number): Promise<OptionCount[]> {
//   const { data, error } = await supabase
//     .from("survey_option_counts")
//     .select("*")
//     .eq("survey_id", surveyId)
//     .order("display_order", { ascending: true });

//   if (error) throw error;
//   return data as OptionCount[];
// }

// export async function createSurvey(
//   question: string,
//   description: string,
//   category: string,
//   creatorId: string,
//   options: string[],
//   expiresAt: string | null
// ) {
//   const { data: survey, error: surveyError } = await supabase
//     .from("surveys")
//     .insert({
//       question,
//       description,
//       category,
//       creator_id: creatorId,
//       expires_at: expiresAt,
//     })
//     .select()
//     .single();

//   if (surveyError) throw surveyError;

//   const optionRows = options
//     .filter((opt) => opt.trim().length > 0)
//     .map((opt, index) => ({
//       survey_id: survey.id,
//       choice_text: opt.trim(),
//       display_order: index,
//     }));

//   const { error: optionsError } = await supabase.from("options").insert(optionRows);
//   if (optionsError) throw optionsError;

//   return survey as Survey;
// }

// // ---------- Responses ----------

// export async function hasUserVoted(surveyId: number, userId: string): Promise<boolean> {
//   const { data, error } = await supabase
//     .from("responses")
//     .select("id")
//     .eq("survey_id", surveyId)
//     .eq("user_id", userId)
//     .maybeSingle();

//   if (error) throw error;
//   return !!data;
// }

// export async function getUserVote(surveyId: number, userId: string) {
//   const { data, error } = await supabase
//     .from("responses")
//     .select("option_id")
//     .eq("survey_id", surveyId)
//     .eq("user_id", userId)
//     .maybeSingle();

//   if (error) throw error;
//   return data;
// }

// export async function submitVote(surveyId: number, optionId: number, userId: string) {
//   const { error } = await supabase.from("responses").insert({
//     survey_id: surveyId,
//     option_id: optionId,
//     user_id: userId,
//   });

//   if (error) throw error;
// }

// // ---------- CSV export (stretch goal) ----------

// export function optionCountsToCsv(surveyQuestion: string, counts: OptionCount[]): string {
//   const header = "Choice,Votes\n";
//   const rows = counts
//     .map((c) => `"${c.choice_text.replace(/"/g, '""')}",${c.vote_count}`)
//     .join("\n");
//   return `Survey: ${surveyQuestion}\n${header}${rows}`;
// }

// export function downloadCsv(filename: string, csvContent: string) {
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", filename);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

import { supabase } from "./supabase";
import type { Survey, SurveyOption, OptionCount, SurveyComment } from "../types/survey";

// ---------- Surveys ----------

export async function fetchActiveSurveys(): Promise<Survey[]> {
  const { data, error } = await supabase
    .from("surveys")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Survey[];
}

export async function fetchSurveyById(id: number): Promise<Survey> {
  const { data, error } = await supabase
    .from("surveys")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Survey;
}

export async function fetchOptionsForSurvey(surveyId: number): Promise<SurveyOption[]> {
  const { data, error } = await supabase
    .from("options")
    .select("*")
    .eq("survey_id", surveyId)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as SurveyOption[];
}

export async function fetchOptionCounts(surveyId: number): Promise<OptionCount[]> {
  const { data, error } = await supabase
    .from("survey_option_counts")
    .select("*")
    .eq("survey_id", surveyId)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as OptionCount[];
}

export async function createSurvey(
  question: string,
  description: string,
  category: string,
  creatorId: string,
  options: string[],
  expiresAt: string | null
) {
  const { data: survey, error: surveyError } = await supabase
    .from("surveys")
    .insert({
      question,
      description,
      category,
      creator_id: creatorId,
      expires_at: expiresAt,
    })
    .select()
    .single();

  if (surveyError) throw surveyError;

  const optionRows = options
    .filter((opt) => opt.trim().length > 0)
    .map((opt, index) => ({
      survey_id: survey.id,
      choice_text: opt.trim(),
      display_order: index,
    }));

  const { error: optionsError } = await supabase.from("options").insert(optionRows);
  if (optionsError) throw optionsError;

  return survey as Survey;
}

export async function updateSurvey(
  surveyId: number,
  fields: {
    question: string;
    description: string;
    category: string;
    expiresAt: string | null;
    isActive: boolean;
  }
) {
  const { error } = await supabase
    .from("surveys")
    .update({
      question: fields.question,
      description: fields.description,
      category: fields.category,
      expires_at: fields.expiresAt,
      is_active: fields.isActive,
    })
    .eq("id", surveyId);

  if (error) throw error;
}

export async function deleteSurvey(surveyId: number) {
  // options and responses cascade-delete automatically via FK constraints
  const { error } = await supabase.from("surveys").delete().eq("id", surveyId);
  if (error) throw error;
}

// ---------- Option-level CRUD (used by the edit page) ----------

export async function updateOption(optionId: number, choiceText: string) {
  const { error } = await supabase
    .from("options")
    .update({ choice_text: choiceText })
    .eq("id", optionId);
  if (error) throw error;
}

export async function addOption(surveyId: number, choiceText: string, displayOrder: number) {
  const { error } = await supabase
    .from("options")
    .insert({ survey_id: surveyId, choice_text: choiceText, display_order: displayOrder });
  if (error) throw error;
}

export async function deleteOption(optionId: number) {
  // any responses tied to this option cascade-delete automatically via FK constraint
  const { error } = await supabase.from("options").delete().eq("id", optionId);
  if (error) throw error;
}

// ---------- Responses ----------

export async function hasUserVoted(surveyId: number, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("responses")
    .select("id")
    .eq("survey_id", surveyId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function getUserVote(surveyId: number, userId: string) {
  const { data, error } = await supabase
    .from("responses")
    .select("option_id")
    .eq("survey_id", surveyId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function submitVote(surveyId: number, optionId: number, userId: string) {
  const { error } = await supabase.from("responses").insert({
    survey_id: surveyId,
    option_id: optionId,
    user_id: userId,
  });

  if (error) throw error;
}

// ---------- CSV export (stretch goal) ----------

export function optionCountsToCsv(surveyQuestion: string, counts: OptionCount[]): string {
  const header = "Choice,Votes\n";
  const rows = counts
    .map((c) => `"${c.choice_text.replace(/"/g, '""')}",${c.vote_count}`)
    .join("\n");
  return `Survey: ${surveyQuestion}\n${header}${rows}`;
}

export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ---------- Featured survey (used on the homepage) ----------

export async function fetchFeaturedSurvey(): Promise<Survey | null> {
  // prefer the "Customer Feedback" category survey; fall back to the oldest active survey
  const { data: byCategory, error: categoryError } = await supabase
    .from("surveys")
    .select("*")
    .eq("category", "Customer Feedback")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (categoryError) throw categoryError;
  if (byCategory) return byCategory as Survey;

  const { data: fallback, error: fallbackError } = await supabase
    .from("surveys")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (fallbackError) throw fallbackError;
  return (fallback as Survey) || null;
}

// ---------- Comments (stretch goal) ----------

export async function fetchComments(surveyId: number): Promise<SurveyComment[]> {
  const { data: comments, error } = await supabase
    .from("survey_comments")
    .select("*")
    .eq("survey_id", surveyId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!comments || comments.length === 0) return [];

  const userIds = [...new Set(comments.map((c) => c.user_id))];
  const { data: profiles } = await supabase
    .from("Profile")
    .select("id, full_name")
    .in("id", userIds);

  const nameById = new Map((profiles || []).map((p: any) => [p.id, p.full_name]));

  return (comments as SurveyComment[]).map((c) => ({
    ...c,
    author_name: nameById.get(c.user_id) || "Anonymous",
  }));
}

export async function addComment(surveyId: number, userId: string, comment: string) {
  const { error } = await supabase
    .from("survey_comments")
    .insert({ survey_id: surveyId, user_id: userId, comment });
  if (error) throw error;
}
