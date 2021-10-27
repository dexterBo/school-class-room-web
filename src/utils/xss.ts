export const filterXSS = (str: string | null) => {
  if (!str) return str;
  for (; str !== unescape(str);) str = unescape(str);
  for (let r = ['<', '>', "'", '"', '%3c', '%3e', '%27', '%22', '%253c', '%253e', '%2527', '%2522'], n = ['&#x3c;', '&#x3e;', '&#x27;', '&#x22;', '%26%23x3c%3B', '%26%23x3e%3B', '%26%23x27%3B', '%26%23x22%3B', '%2526%2523x3c%253B', '%2526%2523x3e%253B', '%2526%2523x27%253B', '%2526%2523x22%253B'], a = 0; a < r.length; a++) str = str.replace(new RegExp(r[a], 'gi'), n[a]);
  return str;
};

export const getCookie = (str: string) => {
  let a;
  return filterXSS((a = document.cookie.match(RegExp('(^|;\\s*)' + str + '=([^;]*)(;|$)'))) ? unescape(a[2]) : null);
};