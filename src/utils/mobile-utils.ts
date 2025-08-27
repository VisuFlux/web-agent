export function getDeviceType(): "COMPUTER" | "SMARTPHONE" | "TABLET" | "UNKNOWN" {
  const userAgent = navigator.userAgent;
  const screenWidth = window.innerWidth;

  if (/Mobile|Android/.test(userAgent)) return "SMARTPHONE";
  if (/(tablet|ipad)/i.test(userAgent)) return "TABLET";

  if (navigator.maxTouchPoints > 0) return screenWidth < 768 ? "SMARTPHONE" : "TABLET";
  return "COMPUTER";
}
