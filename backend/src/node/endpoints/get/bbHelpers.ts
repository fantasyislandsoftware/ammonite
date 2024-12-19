import { writeFileSync } from "fs";
import { removeComments } from "./codeProcessing";

export const convertJam2BBCommand = (jamCommand: string) => {
  const commands: { [key: string]: string } = {
    openScreen: "Screen",
  };
  return commands[jamCommand as keyof typeof commands] || jamCommand;
};

export const convertLineToBB = (line: string) => {
  const fi = line.indexOf("(");
  const funcName = convertJam2BBCommand(line.substring(0, fi));
  const args = line.substring(fi + 2, line.length - 2).split(",");
  let argString = "";
  args.forEach((arg, index) => {
    const x = arg.split(":");
    if (x.length > 1) {
      const v = x[1].trim();
      argString += `${v}`;
      if (index < args.length - 2) {
        argString += ", ";
      }
    }
  });
  line = `${funcName} ${argString}`;
  return line;
};

export const exportBB = (path: string, data: string) => {
  let lines = data.split("\n");
  lines.forEach((line, index) => {
    lines[index] = line.trimStart();
    if (lines[index] === "{" || lines[index] === "}") {
      lines[index] = "";
    }
  });
  const j = lines.join("\n");
  lines = removeComments(j).split(";");
  const output: string[] = [];
  lines.forEach((line, index) => {
    lines[index] = line.trim();
    lines[index] = lines[index].replace(/[\n\r]+/g, "");
    let l = lines[index];
    if (!l.startsWith("import") && l !== "") {
      l = convertLineToBB(l);
      output.push(l);
    }
  });
  writeFileSync(path + ".bb", output.join("\n"));
};
