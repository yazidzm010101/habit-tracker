// thanks to
// https://medium.com/trabe/reusable-react-portals-17dead20232b

import { ReactNode, useEffect, useRef } from "react";

import { createPortal } from "react-dom";

function Portal({ children }: { children: ReactNode }) {
  const rootId = "portal";
  const target = useRef<any>(document.getElementById(rootId));

  useEffect(() => {
    return () => {
      window.requestAnimationFrame(() => {
        if (target.current.childNodes.length === 0) {
          target.current.remove();
          target.current = null;
        }
      });
    };
  }, []);

  if (!target.current) {
    target.current = document.createElement("div");
    target.current.setAttribute("id", rootId);
    document.body.appendChild(target.current);
  }

  return createPortal(children, target.current);
}

export default Portal;
