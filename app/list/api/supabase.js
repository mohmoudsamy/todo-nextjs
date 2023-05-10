import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://vwgdhyxinukcwwgbsphq.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Z2RoeXhpbnVrY3d3Z2JzcGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1MzM4ODksImV4cCI6MTk5OTEwOTg4OX0.tvxdgt1V1QJuWRL_yJRo4ukhlDzjy0g_046T85txthw";
const supabase = createClient(supabaseURL, anonKey);

export const getAllLists = async () => {
  const { data, error } = await supabase.from("lists").select();
  return { data, error };
};

export const insertNewList = async (listName) => {
  const { error } = await supabase
    .from("lists")
    .insert({ list_name: listName });
  return { error };
};
