"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import DonateModal from "./DonateModal";
import PartnerModal from "./PartnerModal";
import VolunteerModal from "./VolunteerModal";

export type InvolvedModal = "donate" | "volunteer" | "partner";

type Ctx = { open: (modal: InvolvedModal) => void };

const GetInvolvedContext = createContext<Ctx | null>(null);

/** Wrap a page once; any button inside can then open the Donate, Volunteer or Partner popup. */
export function GetInvolvedProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<InvolvedModal | null>(null);
  const open = useCallback((modal: InvolvedModal) => setActive(modal), []);
  const close = useCallback(() => setActive(null), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <GetInvolvedContext.Provider value={value}>
      {children}
      <DonateModal open={active === "donate"} onClose={close} />
      <VolunteerModal open={active === "volunteer"} onClose={close} />
      <PartnerModal open={active === "partner"} onClose={close} />
    </GetInvolvedContext.Provider>
  );
}

export function useGetInvolved() {
  const ctx = useContext(GetInvolvedContext);
  if (!ctx) throw new Error("useGetInvolved must be used inside <GetInvolvedProvider>");
  return ctx;
}
