import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://vwgdhyxinukcwwgbsphq.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Z2RoeXhpbnVrY3d3Z2JzcGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1MzM4ODksImV4cCI6MTk5OTEwOTg4OX0.tvxdgt1V1QJuWRL_yJRo4ukhlDzjy0g_046T85txthw";
const supabase = createClient(supabaseURL, anonKey);

export const getAllLists = async () => {
  const { data, error } = await supabase.from("lists").select();
  return { data, error };
};

export const getSingleList = async (id) => {
  const { data, error } = await supabase
    .from("lists")
    .select()
    .eq("id", id)
    .single();
  return { data, error };
};

export const getUserLists = async (user_id) => {
  const { data, error } = await supabase
    .from("lists")
    .select()
    .eq("user_id", user_id);
  return { data, error };
};

export const insertNewList = async (
  listName = "Untitled List",
  items,
  user
) => {
  const { error } = await supabase
    .from("lists")
    .insert({ list_name: listName, items: items, user_id: user.id });
  return { error };
};

export const markCompletedList = async (status, list_id, item_id) => {
  const data = await supabase
    .from("lists")
    .update({ status })
    .eq("id", list_id);
  console.log(data);
  return data;
};

export const deleteList = async (id) => {
  const { error } = await supabase.from("lists").delete().eq("id", id);
  return { error };
};
