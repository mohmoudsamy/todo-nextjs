import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://vwgdhyxinukcwwgbsphq.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Z2RoeXhpbnVrY3d3Z2JzcGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1MzM4ODksImV4cCI6MTk5OTEwOTg4OX0.tvxdgt1V1QJuWRL_yJRo4ukhlDzjy0g_046T85txthw";
const supabase = createClient(supabaseURL, anonKey);

export const signUpUser = async ({ firstName, lastName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    firstName,
    lastName,
    email,
    password,
  });

  const userData = await supabase.from("users").insert({
    first_name: firstName,
    last_name: lastName,
    email,
  });
  console.log(userData);
  return { data, error };
};

export const logInUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
};

export const getUserData = async (userEmail) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .single();
  return { data };
};

export const logOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
