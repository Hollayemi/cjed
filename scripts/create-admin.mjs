// Create (or reset the password of) an admin. There is no public sign-up.
//   node --env-file=.env.local scripts/create-admin.mjs you@example.com
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const email = process.argv[2]?.trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Usage: node --env-file=.env.local scripts/create-admin.mjs <email>");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set (run with --env-file=.env.local)");
  process.exit(1);
}

function askHidden(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    const stdin = process.stdin;
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let input = "";
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n" || ch === "\u0004") {
          stdin.setRawMode?.(false);
          stdin.pause();
          stdin.off("data", onData);
          process.stdout.write("\n");
          return resolve(input);
        }
        if (ch === "\u0003") process.exit(1);
        if (ch === "\u007f") input = input.slice(0, -1);
        else input += ch;
      }
    };
    stdin.on("data", onData);
  });
}

const password = await askHidden("Password (min 6 characters): ");
if (password.length < 6) {
  console.error("Password must be at least 6 characters.");
  process.exit(1);
}
const confirm = await askHidden("Repeat password: ");
if (confirm !== password) {
  console.error("Passwords do not match.");
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);
const now = new Date();
await mongoose.connection.collection("admins").updateOne(
  { email },
  {
    $set: { passwordHash: await bcrypt.hash(password, 12), role: "admin", failedAttempts: 0, updatedAt: now },
    $unset: { lockUntil: "" },
    $setOnInsert: { createdAt: now },
  },
  { upsert: true },
);
console.log(`Admin ready: ${email}`);
await mongoose.disconnect();
