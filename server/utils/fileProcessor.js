import * as fs from "fs";

export function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, {
      encoding: "utf8",
      flag: "r",
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}
