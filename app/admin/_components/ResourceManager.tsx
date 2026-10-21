"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RESOURCES, type Field, type ResourceKey } from "@/lib/resource-config";

type Item = {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  updatedAt: string;
  [key: string]: unknown;
};

const control =
  "mt-1 block w-full rounded-md border border-[#C9CEC6] bg-white px-3 py-2 text-sm outline-none focus:border-[#B7791F] focus:ring-2 focus:ring-[#B7791F]/30";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7791F]";
const date = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function ResourceManager({ resource }: { resource: ResourceKey }) {
  const cfg = RESOURCES[resource];
  const fields: Field[] = cfg.fields;
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [listError, setListError] = useState("");
  const [notice, setNotice] = useState("");

  const [panel, setPanel] = useState<{ id?: string } | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Load the list (search is debounced).
  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(
      async () => {
        try {
          const params = new URLSearchParams({ page: String(page), limit: "10" });
          if (q.trim()) params.set("q", q.trim());
          if (status) params.set("status", status);
          const res = await fetch(`/api/admin/${resource}?${params}`, { signal: ctrl.signal });
          if (res.status === 401) return router.replace("/admin/login");
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Could not load the list.");
          setItems(data.items);
          setPages(data.pages);
          setListError("");
          setLoading(false);
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
          setListError((err as Error).message || "Could not load the list.");
          setLoading(false);
        }
      },
      q ? 300 : 0,
    );
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [resource, page, q, status, refresh, router]);

  // Close the panel with Escape; clear the notice after a few seconds.
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  function openForm(item?: Item) {
    const values: Record<string, string> = {};
    for (const f of fields) {
      const raw = item?.[f.name];
      values[f.name] = raw == null ? "" : f.type === "date" ? String(raw).slice(0, 10) : String(raw);
    }
    if (!item) values.status = "draft";
    setForm(values);
    setFieldErrors({});
    setFormError("");
    setPanel({ id: item?._id });
  }

  async function edit(item: Item) {
    setListError("");
    try {
      // The list leaves out the full text, so load the complete record first.
      const res = await fetch(`/api/admin/${resource}/${item._id}`);
      if (res.status === 401) return router.replace("/admin/login");
      const data = await res.json();
      if (!res.ok) return setListError(data.error ?? "Could not open this item.");
      openForm(data.item);
    } catch {
      setListError("Network problem. Check your connection and try again.");
    }
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!panel) return;
    setSaving(true);
    setFormError("");
    setFieldErrors({});
    try {
      const res = await fetch(panel.id ? `/api/admin/${resource}/${panel.id}` : `/api/admin/${resource}`, {
        method: panel.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 401) return router.replace("/admin/login");
      const data = await res.json();
      if (!res.ok) {
        setFieldErrors(data.fields ?? {});
        setFormError(data.error ?? "Could not save. Try again.");
        return;
      }
      setNotice(panel.id ? "Changes saved." : "Created.");
      setPanel(null);
      setRefresh((n) => n + 1);
    } catch {
      setFormError("Network problem. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: Item) {
    if (!window.confirm(`Delete “${item.title}”? This can’t be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/${resource}/${item._id}`, { method: "DELETE" });
      if (res.status === 401) return router.replace("/admin/login");
      if (!res.ok) return setListError("Could not delete this item.");
      setNotice("Deleted.");
      if (items.length === 1 && page > 1) setPage(page - 1);
      else setRefresh((n) => n + 1);
    } catch {
      setListError("Network problem. Check your connection and try again.");
    }
  }

  const filtering = q.trim() !== "" || status !== "";

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{cfg.label}</h1>
        <button
          onClick={() => openForm()}
          className={`rounded-md bg-[#14232B] px-4 py-2 text-sm font-medium text-white hover:bg-[#1f3640] ${focus}`}
        >
          Add {cfg.singular}
        </button>
      </header>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title"
          aria-label={`Search ${cfg.label.toLowerCase()} by title`}
          className={`${control} mt-0 max-w-xs`}
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by status"
          className={`${control} mt-0 w-auto`}
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {notice && (
        <p role="status" className="mt-4 rounded-md bg-[#E3F0E8] px-3 py-2 text-sm text-[#2F6B4F]">
          {notice}
        </p>
      )}
      {listError && (
        <p role="alert" className="mt-4 rounded-md bg-[#F8E5E3] px-3 py-2 text-sm text-[#8A2A22]">
          {listError}
        </p>
      )}

      <div className="mt-4 overflow-x-auto rounded-lg border border-[#D9DDD6] bg-white">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="border-b border-[#D9DDD6] text-[#14232B]/60">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E9E3]">
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#14232B]/60">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-[#14232B]/70">
                  {filtering
                    ? "Nothing matches that search."
                    : `No ${cfg.label.toLowerCase()} yet. Use “Add ${cfg.singular}” to create the first one.`}
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-[#14232B]/50">/{item.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === "published" ? "bg-[#E3F0E8] text-[#2F6B4F]" : "bg-[#ECEEE9] text-[#5A6A70]"
                    }`}
                  >
                    {item.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-[#14232B]/70">{date(item.updatedAt)}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => edit(item)} className={`rounded px-2 py-1 font-medium hover:bg-[#F4F5F2] ${focus}`}>
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item)}
                    className={`ml-1 rounded px-2 py-1 font-medium text-[#8A2A22] hover:bg-[#F8E5E3] ${focus}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className={`rounded-md border border-[#C9CEC6] bg-white px-3 py-1.5 disabled:opacity-40 ${focus}`}
          >
            Previous
          </button>
          <span className="text-[#14232B]/70">
            Page {page} of {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
            className={`rounded-md border border-[#C9CEC6] bg-white px-3 py-1.5 disabled:opacity-40 ${focus}`}
          >
            Next
          </button>
        </div>
      )}

      {panel && (
        <div
          className="fixed inset-0 z-10 flex bg-[#14232B]/50"
          onMouseDown={(e) => e.target === e.currentTarget && setPanel(null)}
        >
          <form
            onSubmit={save}
            noValidate
            role="dialog"
            aria-modal="true"
            aria-label={panel.id ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}
            className="ml-auto flex h-full w-full max-w-xl flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#D9DDD6] px-6 py-4">
              <h2 className="text-lg font-semibold">{panel.id ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}</h2>
              <button type="button" onClick={() => setPanel(null)} className={`rounded px-2 py-1 text-sm ${focus}`}>
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                    <label htmlFor={`f-${f.name}`} className="text-sm font-medium">
                      {f.label}
                      {f.required && <span className="text-[#8A2A22]"> *</span>}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={`f-${f.name}`}
                        rows={f.rows ?? 4}
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className={control}
                      />
                    ) : f.type === "select" ? (
                      <select
                        id={`f-${f.name}`}
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className={control}
                      >
                        {f.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`f-${f.name}`}
                        type={f.type === "date" ? "date" : "text"}
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className={control}
                      />
                    )}
                    {fieldErrors[f.name] ? (
                      <p role="alert" className="mt-1 text-xs text-[#8A2A22]">
                        {fieldErrors[f.name]}
                      </p>
                    ) : (
                      f.hint && <p className="mt-1 text-xs text-[#14232B]/55">{f.hint}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#D9DDD6] px-6 py-4">
              {formError && (
                <p role="alert" className="mb-3 text-sm text-[#8A2A22]">
                  {formError}
                </p>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPanel(null)}
                  className={`rounded-md border border-[#C9CEC6] px-4 py-2 text-sm ${focus}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`rounded-md bg-[#14232B] px-4 py-2 text-sm font-medium text-white hover:bg-[#1f3640] disabled:opacity-60 ${focus}`}
                >
                  {saving ? "Saving…" : panel.id ? "Save changes" : `Create ${cfg.singular}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
