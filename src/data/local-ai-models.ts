/*
 * The models shown on the screens in "Co lokální AI modely umí", by their Hugging Face repos.
 * To update them:
 *
 *   - a new version of a model: change its repo in MODELS,
 *   - a different model for a task: add it to MODELS and point the task to it in TASK_MODELS.
 *
 * The same model can serve any number of tasks. A typo in TASK_MODELS fails `astro check`,
 * and a task left out of it fails the build.
 */

const MODELS = {
  deepseekFlash: "deepseek-ai/DeepSeek-V4.1-Flash-1017",
  gemma31: "google/gemma-4-31B-it",
  glide9: "fastino/GLiDE-9B",
  mistralLarge: "mistralai/Mistral-Large-4-1T-A52B",
  qwen27: "Qwen/Qwen3.8-27B",
  translateGemma: "google/translategemma-12b-it",
  whisperTurbo: "openai/whisper-large-v3-turbo",
  zImage: "Tongyi-MAI/Z-Image-Turbo",
};

const TASK_MODELS: Record<string, keyof typeof MODELS> = {
  triage: "glide9",
  extraction: "qwen27",
  proofreading: "gemma31",
  translation: "translateGemma",
  summaries: "gemma31",
  reports: "deepseekFlash",
  drafting: "deepseekFlash",
  assistant: "mistralLarge",
  coding: "deepseekFlash",
  speech: "whisperTurbo",
  vision: "qwen27",
  "image-generation": "zImage",
};

/** The model shown for a task, by the task's id in local-ai-uses.json. */
export function modelFor(taskId: string) {
  const key = TASK_MODELS[taskId];
  if (!key) throw new Error(`No model set for "${taskId}" in TASK_MODELS.`);
  const repo = MODELS[key];
  const [owner = "", name = ""] = repo.split("/");
  return { owner, name, url: `https://huggingface.co/${repo}` };
}
