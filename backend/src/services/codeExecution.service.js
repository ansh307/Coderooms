const ApiError = require("../utils/ApiError");

const { getExecutionLanguage } = require("../utils/codeLanguage");

const PISTON_URL = process.env.PISTON_URL || "http://localhost:2000/api/v2";

const MAX_CODE_LENGTH = 50_000;
const MAX_INPUT_LENGTH = 10_000;

const execute = async ({ language, code, stdin = "" }) => {
  if (!code || typeof code !== "string") {
    throw new ApiError(400, "Code is required.");
  }

  if (code.length > MAX_CODE_LENGTH) {
    throw new ApiError(400, "Code is too large.");
  }

  if (stdin.length > MAX_INPUT_LENGTH) {
    throw new ApiError(400, "Input is too large.");
  }

  const executionLanguage = getExecutionLanguage(language);

  if (!executionLanguage) {
    throw new ApiError(400, `Code execution is not supported for ${language}.`);
  }

  const response = await fetch(`${PISTON_URL}/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: executionLanguage,
      version: "*",
      files: [
        {
          name: "main",
          content: code,
        },
      ],
      stdin,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message || "Code execution failed.",
    );
  }

  const compile = data.compile || null;
  const run = data.run || null;

  return {
    language: data.language,
    version: data.version,

    compile: compile
      ? {
          stdout: compile.stdout || "",
          stderr: compile.stderr || "",
          output: compile.output || "",
          code: compile.code ?? null,
          signal: compile.signal ?? null,
          status: compile.status ?? null,
        }
      : null,

    run: run
      ? {
          stdout: run.stdout || "",
          stderr: run.stderr || "",
          output: run.output || "",
          code: run.code ?? null,
          signal: run.signal ?? null,
          status: run.status ?? null,
          cpuTime: run.cpu_time ?? null,
          wallTime: run.wall_time ?? null,
          memory: run.memory ?? null,
        }
      : null,
  };
};

module.exports = {
  execute,
};
