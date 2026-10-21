// Client-safe description of the three content types. Drives the admin form and table.
export type FieldType = "text" | "textarea" | "date" | "select" | "image" | "lines";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  half?: boolean;
};

const f = (field: Field) => field;

const title = f({ name: "title", label: "Title", type: "text", required: true });
const slug = f({
  name: "slug",
  label: "URL slug",
  type: "text",
  hint: "Leave blank to create it from the title.",
});
const summary = f({
  name: "summary",
  label: "Short summary",
  type: "textarea",
  rows: 2,
  hint: "Shown on cards. 500 characters max.",
});
const body = f({
  name: "body",
  label: "Full text",
  type: "textarea",
  rows: 10,
  hint: "Plain text. Leave a blank line between paragraphs.",
});
const coverImage = f({
  name: "coverImage",
  label: "Cover image",
  type: "image",
  hint: "Upload a JPG, PNG or WebP up to 8 MB. Landscape photos look best.",
});
const status = f({
  name: "status",
  label: "Status",
  type: "select",
  half: true,
  options: [
    { value: "draft", label: "Draft (hidden)" },
    { value: "published", label: "Published (live)" },
  ],
});

export const RESOURCES = {
  news: {
    label: "News",
    singular: "news post",
    appearsOn: "News page and the “Latest news” section on the home page",
    publicPath: "/news",
    fields: [
      title,
      f({ name: "category", label: "Category", type: "text", half: true }),
      f({ name: "author", label: "Author", type: "text", half: true }),
      summary,
      body,
      coverImage,
      slug,
      status,
    ],
  },
  programs: {
    label: "Programs",
    singular: "program",
    appearsOn: "Programs page (“Recent initiatives”) and the programs section on the home page",
    publicPath: "/programs",
    fields: [
      title,
      f({ name: "category", label: "Category", type: "text", half: true }),
      f({ name: "location", label: "Location", type: "text", half: true }),
      f({ name: "startDate", label: "Starts", type: "date", half: true }),
      f({ name: "endDate", label: "Ends", type: "date", half: true, hint: "Leave blank if it is still running." }),
      summary,
      f({
        name: "highlights",
        label: "Highlights",
        type: "lines",
        rows: 4,
        hint: "One highlight per line. Shown as a bullet list on the program card.",
      }),
      f({
        name: "partners",
        label: "Partners",
        type: "lines",
        rows: 3,
        hint: "One partner per line. Shown as small tags on the program card.",
      }),
      body,
      coverImage,
      slug,
      status,
    ],
  },
  stories: {
    label: "Stories",
    singular: "story",
    appearsOn: "Stories page and the “Stories from the field” section on the home page",
    publicPath: "/stories",
    fields: [
      title,
      f({ name: "author", label: "Told by", type: "text", half: true }),
      f({ name: "location", label: "Location", type: "text", half: true }),
      summary,
      body,
      coverImage,
      slug,
      status,
    ],
  },
} satisfies Record<
  string,
  { label: string; singular: string; appearsOn: string; publicPath: string; fields: Field[] }
>;

export type ResourceKey = keyof typeof RESOURCES;
export const RESOURCE_KEYS = Object.keys(RESOURCES) as ResourceKey[];
export const isResourceKey = (v: string): v is ResourceKey => Object.hasOwn(RESOURCES, v);

/** Where an item lives on the public site, e.g. /news/my-post. */
export const publicUrl = (resource: ResourceKey, slug: string) => `${RESOURCES[resource].publicPath}/${slug}`;
