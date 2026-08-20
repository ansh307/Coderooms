export interface CodeExecutionResult {
  language: string;
  version: string;

  compile: {
    stdout: string;
    stderr: string;
    output: string;
    code: number | null;
    signal: string | null;
    status: string | null;
  } | null;

  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number | null;
    signal: string | null;
    status: string | null;
    cpuTime: number | null;
    wallTime: number | null;
    memory: number | null;
  } | null;
}