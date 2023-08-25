const { join } = require("node:path");
const { readFile, readdir, mkdir, cp, writeFile, rm } = require("node:fs/promises");
const { transform } = require("@swc/core");
const { createElement } = require("react");
const { renderToString } = require("react-dom/server");

const nodeModulesDir = "node_modules";
const modernNormalizeDir = "modern-normalize";
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
  // delete the _tmp dir
  await rm(tmpDir, { recursive: true });
  // create the _site dir if it doesn't exist
  await mkdir(distDir, { recursive: true });
  // create _site/index.html
  await writeFile(
    join(distDir, "index.html"),
    `<!DOCTYPE html>${renderToString(
      createElement(
        Layout,
        {},
        createElement(Page, { srcDir, bookmarkletsDir, repositoryUrl, results }),
      ),
    )}`,
  );
  // copy node_modules/modern-normalize/modern-normalize.css to _site/modern-normalize.css
  await cp(
    join(nodeModulesDir, modernNormalizeDir, "modern-normalize.css"),
    join(distDir, "modern-normalize.css"),
  );
  // copy src/site/style.css to _site/style.css
  await cp(join(srcDir, siteDir, "style.css"), join(distDir, "style.css"));
})();
