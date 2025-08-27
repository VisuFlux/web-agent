export function getDeviceType(): 0 | 1 | 2 | 3 {
  const userAgent = navigator.userAgent;
  const screenWidth = window.innerWidth;

  if (/Mobile|Android/.test(userAgent)) return 1;
  if (/(tablet|ipad)/i.test(userAgent)) return 2;

  if (navigator.maxTouchPoints > 0) return screenWidth < 768 ? 1 : 2;
  return 0;
}
