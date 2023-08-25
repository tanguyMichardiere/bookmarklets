const { readFile, readdir, writeFile } = require("node:fs/promises");
const { transform } = require("@swc/core");

readdir("src").then(function (files) {
  Promise.all(
    files.map(async function (file) {
      const { code } = await transform(
        await readFile(`src/${file}`, { encoding: "utf-8" }),
        { filename: file }
      );
      return [file.replace(".ts", ""), code];
    })
  ).then(function (results) {
    let readme = "# Bookmarklets\n";
    for (const [name, code] of results) {
      readme += `\n## ${name}\n\n\`\`\`javascript\njavascript:{${code}}\n\`\`\`\n`;
    }
    writeFile("README.md", readme);
  });
});
