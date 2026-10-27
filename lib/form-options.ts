// Client-safe. Shared by the forms in the browser and by the validation on the server,
// so the dropdowns and the checks can never drift apart.

export const VOLUNTEER_LEVELS = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "Nigerian Law School",
  "Postgraduate",
  "Graduate / Other",
] as const;

export const ORGANISATION_TYPES = [
  "NGO / Civil society",
  "Law firm",
  "Academic institution",
  "Government agency",
  "Corporate / Business",
  "International development organisation",
  "Other",
] as const;

// CV uploads. 4 MB keeps the request under the 4.5 MB body limit of serverless hosts.
export const CV_MAX_BYTES = 4 * 1024 * 1024;
export const CV_EXTENSIONS = ["pdf", "doc", "docx"] as const;
export const CV_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const fileExtension = (name: string) => name.split(".").pop()?.toLowerCase() ?? "";

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns an error message for an unusable CV file, or "" when it is fine. */
export function cvProblem(file: { name: string; size: number }) {
  if (!(CV_EXTENSIONS as readonly string[]).includes(fileExtension(file.name))) {
    return "Upload your CV as a PDF or Word file (.pdf, .doc, .docx).";
  }
  if (file.size === 0) return "That file is empty.";
  if (file.size > CV_MAX_BYTES) return `Your CV must be ${formatBytes(CV_MAX_BYTES)} or smaller.`;
  return "";
}
