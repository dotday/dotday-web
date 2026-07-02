import { Fragment } from "react";

/**
 * renderInlineLinks - renders a plain string that may contain markdown-style
 * [label](href) links as React nodes, emitting each link as a neon-underline
 * `.inlink` anchor. No HTML parsing / dangerouslySetInnerHTML: content JSON
 * stays plain text and only this one link form is interpreted, so validators
 * keep seeing copy, not markup.
 *
 * "See the [Installation Guides](/installation-guides) for the full write-up."
 *   -> See the <a class="inlink" href="/installation-guides">Installation Guides</a> ...
 */
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderInlineLinks(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    nodes.push(
      <a key={key++} className="inlink" href={m[2]}>
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return nodes;
}
