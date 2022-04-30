import template from "lodash.template";

export function compileLink(link: string, tokens: Record<string, unknown>): string {
  const url = new URL(link);

  try {
    const compiled = template(decodeURIComponent(url.search));
    const result = compiled({tokens});

    url.search = new URLSearchParams(result).toString();

    return url.toString();
  } catch (e) {
    return link;
  }
}

export function getLinkTokens(link: string): string[] {
  const url = new URL(link);
  const params = decodeURIComponent(url.search);

  const regexp = new RegExp(/\${\s?tokens\[["'](?<tokens>.*?)["']\]\s?}/gm);
  const matches: string[] = [];
  let executions: RegExpExecArray;

  while ((executions = regexp.exec(params)) !== null) {
    if (executions.index === regexp.lastIndex) {
      regexp.lastIndex++;
    }

    executions.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        matches.push(match);
      }
    });
  }

  return matches;
}

export function getTokensValues(tokens: string[]): Record<string, string> {
  const values = JSON.parse(localStorage.getItem("tokens") || "{}");

  return tokens.reduce((acc, token) => {
    acc[token] = values[token] || "";

    return acc;
  }, {});
}

export function setTokensValues(tokens: Record<string, unknown>): void {
  let draft = JSON.parse(localStorage.getItem("tokens") || "{}");

  draft = {...draft, ...tokens};
  localStorage.setItem("tokens", JSON.stringify(draft));
}
