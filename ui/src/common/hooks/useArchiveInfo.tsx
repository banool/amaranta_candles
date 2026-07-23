import { useEffect, useState } from "react";

import { apiBase } from "../store";

export type ArchiveInfo = {
  readOnly: boolean;
  snapshotDate: string | null;
};

// The archive endpoint's answer is fixed for the life of the deployment, so
// fetch it once and share that single request with every component that asks:
// the sidebar footer, plus each list page deciding whether to render its create
// form. Without this each of them would hit /api/archive independently on mount.
let cached: Promise<ArchiveInfo> | null = null;

const fetchArchiveInfo = (): Promise<ArchiveInfo> => {
  if (cached === null) {
    cached = fetch(`${apiBase}/archive`)
      .then(response => response.json())
      .then(data => ({
        readOnly: Boolean(data.read_only),
        snapshotDate: data.snapshot_date || null
      }))
      .catch(() => {
        // If we can't tell, assume the safest answer -- read-only -- so we
        // never show write UI that would only fail. Drop the cache so a later
        // mount retries rather than being stuck on this fallback.
        cached = null;
        return { readOnly: true, snapshotDate: null };
      });
  }
  return cached;
};

// Returns null until the answer is known, then the archive info. Callers should
// treat null as "not yet decided" and render nothing write-related until it
// resolves, so a create form never flashes in before the flag arrives.
export default (): ArchiveInfo | null => {
  const [info, setInfo] = useState<ArchiveInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchArchiveInfo().then(result => {
      if (!cancelled) setInfo(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return info;
};
