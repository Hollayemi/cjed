import mongoose, { Schema, type Model } from "mongoose";
import type { ResourceKey } from "./resource-config";

/* ---------- Admin ---------- */
const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, default: "admin" },
    failedAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
  },
  { timestamps: true },
);

export type AdminDoc = {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  role: string;
  failedAttempts: number;
  lockUntil?: Date;
};

export const Admin: Model<AdminDoc> =
  (mongoose.models.Admin as Model<AdminDoc>) || mongoose.model<AdminDoc>("Admin", adminSchema);

/* ---------- Content (news / programs / stories) ---------- */
const base = {
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  summary: { type: String, trim: true, maxlength: 500, default: "" },
  body: { type: String, default: "" },
  coverImage: { type: String, trim: true, default: "" },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  publishedAt: { type: Date },
};

const schemas: Record<ResourceKey, Schema> = {
  news: new Schema(
    { ...base, category: { type: String, trim: true, default: "" }, author: { type: String, trim: true, default: "" } },
    { timestamps: true },
  ),
  programs: new Schema(
    {
      ...base,
      category: { type: String, trim: true, default: "" },
      location: { type: String, trim: true, default: "" },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
    },
    { timestamps: true },
  ),
  stories: new Schema(
    { ...base, author: { type: String, trim: true, default: "" }, location: { type: String, trim: true, default: "" } },
    { timestamps: true },
  ),
};

export type ContentModel = Model<Record<string, unknown>>;

const modelNames: Record<ResourceKey, string> = { news: "News", programs: "Program", stories: "Story" };

function getModel(key: ResourceKey) {
  const name = modelNames[key];
  return ((mongoose.models[name] as ContentModel | undefined) ??
    mongoose.model(name, schemas[key])) as unknown as ContentModel;
}

export const models: Record<ResourceKey, ContentModel> = {
  news: getModel("news"),
  programs: getModel("programs"),
  stories: getModel("stories"),
};
