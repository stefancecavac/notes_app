import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDynamicTitleAndFaviconHook = (title: string | undefined, icon: string | undefined) => {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (!location.pathname.includes("notes")) {
      const trimedLocation = location.pathname.substring(1);
      document.title = trimedLocation;
    } else {
      document.title = title?.trim() || "New note";
    }

    const link = (document.querySelector("link[rel='icon']") as HTMLLinkElement) || document.createElement("link");

    link.type = "image/svg+xml";
    link.rel = "icon";

    if (icon && icon.trim() !== "") {
      link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(icon)}`;
    } else {
      const fallbackSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#a3a3a3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>`;
      link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}`;
    }

    if (!document.head.contains(link)) {
      document.head.appendChild(link);
    }
  }, [icon, title]);
};
