//import { useEffect, useState } from "react";

// export function useMobile() {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return isMobile;
//}

import { useEffect, useState } from "react";

export function useMobile() {
  const mediaQuery = "(max-width: 992px)"; //768

  const [isMobile, setIsMobile] = useState(
    window.matchMedia(mediaQuery).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);

    const listener = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, []);

  return isMobile;
}
