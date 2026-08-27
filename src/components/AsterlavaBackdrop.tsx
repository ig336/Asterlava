"use client";

/**
 * React wrapper around asterlava-backdrop.js.
 *
 * Usage (Next.js / any React app):
 *
 *   import AsterlavaBackdrop from "./AsterlavaBackdrop";
 *
 *   <div className="relative min-h-screen">
 *     <AsterlavaBackdrop />
 *     <div className="relative z-10">...your content...</div>
 *   </div>
 *
 * All asterlava-backdrop.js options are accepted as props, e.g.:
 *   <AsterlavaBackdrop scrollDriven={false} colors={{ resolve: "#c9932f" }} />
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mountAsterlavaBackdrop } from "./asterlava-backdrop";

type AsterlavaBackdropProps = {
  scrollDriven?: boolean;
  highDetail?: boolean;
};

export default function AsterlavaBackdrop(props: AsterlavaBackdropProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const backdrop = mountAsterlavaBackdrop(host, { ...props, THREE });
    return () => backdrop.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} className="fixed inset-0 z-0 h-screen w-screen" aria-hidden="true" />;
}
