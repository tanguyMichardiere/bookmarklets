const { join } = require("node:path");
const { readdir, readFile, mkdir, writeFile, rm, cp } = require("node:fs/promises");
const { promisify } = require("node:util");
const exec = promisify(require("node:child_process").exec);
const { createHash } = require("node:crypto");

const { transform } = require("@swc/core");
const { createElement } = require("react");
const { renderToString } = require("react-dom/server");

const srcDir = "src";
const bookmarkletsDir = "bookmarklets";
const siteDir = "site";
const tmpDir = "_tmp";
const distDir = "_site";

const repositoryUrl = "https://github.com/tanguyMichardiere/bookmarklets";

(async function () {
  // compile the bookmarklets
  const results = await Promise.all(
    (await readdir(join(srcDir, bookmarkletsDir))).map(async function (filename) {
      const { code } = await transform(
        await readFile(join(srcDir, bookmarkletsDir, filename), { encoding: "utf-8" }),
        { filename },
      );
      return [filename, code];
    }),
  );
  // create the _tmp dir if it doesn't exist
  await mkdir(tmpDir, { recursive: true });
  // compile the CSS
  await exec(
    `npx tailwindcss -i ${join(srcDir, siteDir, "style.css")} -o ${join(tmpDir, "style.css")} -m`,
  );
  const cssHash = createHash("shake256", { outputLength: 4 })
    .update(await readFile(join(tmpDir, "style.css")))
    .digest("hex");
  // compile the site components
  await Promise.all(
    (await readdir(join(srcDir, siteDir)))
      .filter((filename) => filename.endsWith(".tsx"))
      .map(async function (filename) {
        const { code } = await transform(
          await readFile(join(srcDir, siteDir, filename), { encoding: "utf-8" }),
          { filename },
        );
        await writeFile(join(tmpDir, filename.replace(".tsx", ".js")), code);
      }),
  );
  // import the needed components
  const Layout = require("../_tmp/Layout").default;
  const Page = require("../_tmp/Page").default;
  // create the _site dir if it doesn't exist
  await mkdir(distDir, { recursive: true });
  // create _site/index.html
  await writeFile(
    join(distDir, "index.html"),
    `<!DOCTYPE html>${renderToString(
      createElement(
        Layout,
        { cssHash },
        createElement(Page, { srcDir, bookmarkletsDir, repositoryUrl, results }),
      ),
    )}`,
  );
  // copy src/site/favicon.ico to _site/favicon.ico
  await cp(join(srcDir, siteDir, "favicon.ico"), join(distDir, "favicon.ico"));
  // copy _tmp/style.css to _site/style.hash.css
  await cp(join(tmpDir, "style.css"), join(distDir, `style.${cssHash}.css`));
  // delete the _tmp dir
  await rm(tmpDir, { recursive: true });
})();
