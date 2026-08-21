const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "go",
  "rust",
  "ruby",
  "php",
  "kotlin",
  "swift"
];

const LANGUAGE_MAP = {
  javascript: "javascript",
  js: "javascript",

  typescript: "typescript",
  ts: "typescript",

  python: "python",
  python3: "python",

  java: "java",

  c: "c",
  cpp: "c++",

  go: "go",

  rust: "rust",

  ruby: "ruby",

  php: "php",

  kotlin: "kotlin",

  swift: "swift",
};

const getExecutionLanguage = (language) => {
  if (!language) {
    return null;
  }

  return LANGUAGE_MAP[
    language.toLowerCase().trim()
  ] || null;
};

module.exports = {
  getExecutionLanguage,
  LANGUAGE_MAP,
  SUPPORTED_LANGUAGES
};