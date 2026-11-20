import fs from "fs";

const files = [
  "node_modules/next/dist/server/dev/next-dev-server.js",
  "node_modules/next/dist/esm/server/dev/next-dev-server.js",
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, "utf8");

  const targetSnippet = "const updatedManifest = JSON.stringify(existingManifest);";
  if (content.includes(targetSnippet)) {
    content = content.replace(
      targetSnippet,
      "const updatedManifest = JSON.stringify(existingManifest, null, 2);"
    );
    content = content.replace(
      "await _fs.default.promises.writeFile((0, _path.join)(this.distDir, _constants1.PRERENDER_MANIFEST), updatedManifest);",
      "_fs.default.writeFileSync((0, _path.join)(this.distDir, _constants1.PRERENDER_MANIFEST), updatedManifest);"
    );
  }

  const parseSnippet = "const existingManifest = JSON.parse(rawExistingManifest);";
  if (content.includes(parseSnippet)) {
    content = content.replace(
      parseSnippet,
      `let existingManifest;
try {
  existingManifest = JSON.parse(rawExistingManifest);
} catch {
  for (let i = rawExistingManifest.length; i >= 0; i--) {
    if (rawExistingManifest[i] === "}") {
      try {
        existingManifest = JSON.parse(rawExistingManifest.slice(0, i + 1));
        break;
      } catch {}
    }
  }
  if (!existingManifest) {
    existingManifest = { version: 4, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: {} };
  }
}`
    );
  }

  // Also replace any previously injected regex match
  const prevPatch = "try { const m = rawExistingManifest.match(/\\{[\\s\\S]*?\\}\\}/);";
  if (content.includes(prevPatch)) {
    content = content.replace(
      /let existingManifest; try \{ existingManifest = JSON\.parse\(rawExistingManifest\);[\s\S]*?allowHeader: \[\]\s*\};\s*const updatedManifest = JSON\.stringify\(existingManifest\);\s*if \(updatedManifest !== rawExistingManifest\) \{\s*await _fs\.default\.promises\.writeFile\([^)]+\), updatedManifest\);\s*\}/,
      `let existingManifest;
try {
  existingManifest = JSON.parse(rawExistingManifest);
} catch {
  for (let i = rawExistingManifest.length; i >= 0; i--) {
    if (rawExistingManifest[i] === "}") {
      try {
        existingManifest = JSON.parse(rawExistingManifest.slice(0, i + 1));
        break;
      } catch {}
    }
  }
  if (!existingManifest) {
    existingManifest = { version: 4, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: {} };
  }
}
for (const staticPath of value.staticPaths || []) {
  existingManifest.routes[staticPath] = {};
}
existingManifest.dynamicRoutes[pathname] = {
  dataRoute: null,
  dataRouteRegex: null,
  fallback: (0, _fallback.fallbackModeToFallbackField)(res.value.fallbackMode, page),
  fallbackRevalidate: false,
  fallbackExpire: undefined,
  fallbackHeaders: undefined,
  fallbackStatus: undefined,
  fallbackRootParams: undefined,
  fallbackSourceRoute: pathname,
  prefetchDataRoute: undefined,
  prefetchDataRouteRegex: undefined,
  routeRegex: (0, _routeregex.getRouteRegex)(pathname).re.source,
  experimentalPPR: undefined,
  renderingMode: undefined,
  allowHeader: []
};
const updatedManifest = JSON.stringify(existingManifest, null, 2);
_fs.default.writeFileSync((0, _path.join)(this.distDir, _constants1.PRERENDER_MANIFEST), updatedManifest);`
    );
  }

  fs.writeFileSync(file, content);
  console.log("Patched successfully:", file);
}
