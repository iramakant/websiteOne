import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// TODO: replace SUPABASE_URL with your project URL from Supabase settings
const SUPABASE_URL = "https://fzgvqsqbiptzdhstgimx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9xd9TwJrh3PcSz2LBtwlVA_RYEEnA3i";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Home() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const projects = [
    {
      title: "AI Word Alternative",
      description:
        "An AI-powered writing tool designed as a free alternative to traditional word processors. Focused on intelligent editing, content generation, and simplicity.",
      tech: ["AI", "Next.js", "LLMs", "Cloud"],
    },
  ];

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data } = await supabase.from("comments").select("*").order("id", { ascending: false });
    setComments(data || []);
  }

  async function addComment() {
    const clean = text.trim();

    // basic validation
    if (!clean) return;
    if (clean.length > 300) return;

    const { error } = await supabase.from("comments").insert([{ text: clean }]);

    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    setText("");
    fetchComments();
    }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Ramakant Yadav</h1>
        <p className="text-lg text-gray-400 mb-6">
          I build software experiments that explore the future of how we write,
          think, and interact with technology.
        </p>

        <div className="flex gap-4 mb-10">
          <a href="#projects" className="px-4 py-2 bg-white text-black rounded">
            View Experiments
          </a>
          <a href="tel:+918618086165" className="px-4 py-2 border border-gray-600 rounded">
            Call: +91 86180 86165
          </a>
        </div>
      </section>

      <section id="projects" className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Experiments</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-sm px-2 py-1 border border-gray-700 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Feedback</h2>

        <div className="space-y-4 mb-6">
          {comments.map((c, i) => (
            <div key={i} className="border border-gray-800 p-4 rounded">
              <p className="text-gray-300">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave feedback..."
            className="flex-1 p-2 bg-black border border-gray-700 rounded"
          />
          <button
            onClick={addComment}
            className="px-4 py-2 bg-white text-black rounded"
          >
            Post
          </button>
        </div>
      </section>
    </main>
  );
}
