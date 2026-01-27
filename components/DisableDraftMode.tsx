"use client";

import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  return (
    <form action={disableDraftMode} className="draft-banner">
      <span>Draft mode enabled</span>
      <button type="submit" className="btn btn-primary">
        Exit preview
      </button>
    </form>
  );
}
