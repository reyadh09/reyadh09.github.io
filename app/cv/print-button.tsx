"use client";

import { useState } from "react";

export default function PrintButton() {
  const [preparing, setPreparing] = useState(false);

  async function printCV() {
    setPreparing(true);
    try {
      await document.fonts.ready;
      window.print();
    } finally {
      setPreparing(false);
    }
  }

  return <button type="button" onClick={printCV} disabled={preparing}>
    {preparing ? "Preparing…" : "Print / Save PDF"}
  </button>;
}
