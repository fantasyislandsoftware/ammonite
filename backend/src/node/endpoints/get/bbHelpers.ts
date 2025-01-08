import { writeFileSync } from "fs";
import { removeComments } from "./codeProcessing";

export const convertJam2BBCommand = (jamCommand: string) => {
  const commands: { [key: string]: string } = {
    openScreen: "Screen",
    newScreenId: "newScreenId",
  };
  return commands[jamCommand as keyof typeof commands] || jamCommand;
};

export const convertLineToBB_ = (line: string) => {
  const fi = line.indexOf("(");
  const funcName = convertJam2BBCommand(line.substring(0, fi));
  const args = line.substring(fi + 2, line.length - 2).split(",");
  let argString = "";
  let ret = "";
  args.forEach((arg, index) => {
    const x = arg.split(":");
    if (x.length > 1) {
      if (x[0].trim() !== "ret") {
        const v = x[1].trim();
        argString += `${v}`;
        argString += ", ";
      }
      if (x[0].trim() === "ret") {
        ret = `${x[1].replace(/\"/g, "")} = `;
      }
    }
  });
  line = `${ret} ${funcName} ${argString}`;
  if (line.endsWith(", ")) {
    line = line.substring(0, line.length - 2);
  }
  if (funcName === "label") {
    const x = line.split(" ");
    line = `${x[1]}`.replace(/\"/g, "");
  }
  if (funcName === "jp") {
    line = line.replace("jp", "Goto").replace(/\"/g, "");
  }
  return line;
};

const convertLineToBB = (line: string) => {
  line = line.replace("(", "|");
  line = line.replace(")", "");
  const elements = line.split("|");
  //console.log(elements);

  let command = convertJam2BBCommand(elements[0]);
  let argStr = elements[1]
    .replace("{", "")
    .replace("}", "")
    .replace(/: /g, ":")
    .replace(/,,/g, ",")
    .trimLeft()
    .trimRight();

  if (argStr.endsWith(",")) {
    argStr = argStr.substring(0, argStr.length - 1);
  }

  let args = argStr.split(",");

  //console.log(command);

  argStr = " ";
  let retStr = "";
  let type = 0;
  args.map((arg, index) => {
    const argElements = arg.split(":");
    const key = argElements[0];
    let value = argElements[1];
    if (value !== undefined) {
      value = value.replace("$","");
    }
    //if (value.startsWith('$')) {
    //value = value.substring(1);
    //}
    if (key !== "ret") {
      argStr += value;
      argStr += ", ";
    }
    if (key === "ret") {
      type = 1;
      retStr = `${value.replace(/"/g, "")} = `;
    }
  });

  if (command === "label") {
    command = "";
    argStr = argStr.replace(/"/g, "").trimStart();
  }

  if (command === "jp") {
    command = "Goto ";
    argStr = argStr.replace(/"/g, "").trimStart();
  }

  const b1 = type === 0 ? "" : "{";
  const b2 = type === 0 ? "" : "}";
  line = `${retStr}${command}${b1}${argStr}${b2}`;

  if (line.endsWith(", ")) {
    line = line.substring(0, line.length - 2);
  }

  if (line.endsWith(" ")) {
    line = line.substring(0, line.length - 1);
  }

  //console.log(line);
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
  output.unshift(`INCLUDE "jam.ab3"`);
  output.push("End\n");
  writeFileSync(path + ".ab3", output.join("\n"));
};
