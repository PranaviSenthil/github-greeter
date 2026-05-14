import { readFileSync, writeFileSync, existsSync } from "fs";

const path = "dist/client/wrangler.json";

if (existsSync(path)) {
  const config = JSON.parse(readFileSync(path, "utf8"));
  delete config.triggers;
  writeFileSync(path, JSON.stringify(config, null, 2));
  console.log("patched dist/client/wrangler.json: removed empty triggers field");
} else {
  console.log("dist/client/wrangler.json not found, skipping patch");
}
