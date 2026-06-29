import Link from "next/link";
import React from "react";

/**
 * RichText - a tiny, safe markdown-lite renderer for prose bodies.
 *
 * Supports exactly what the content standard uses:
 *   - paragraphs (blank line between)
 *   - [text](url) links  -> rendered as the neon ".ilink" pill (Option D)
 *   - **bold**
 *   - "- " bullet lists and "1. " numbered lists
 *
 * It does NOT run a full markdown parser or dangerouslySetInnerHTML, so author
 * content can't inject markup. Internal links use next/link.
 */

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Tokenize on links first, then bold within the remaining text.
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(...renderBold(text.slice(last, m.index), `${keyBase}-t${i}`));
    }
    const label = m[1];
    const href = m[2];
    const external = href.startsWith("http");
    nodes.push(
      external ? (
        <a
          key={`${keyBase}-l${i}`}
          className="ilink"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ) : (
        <Link key={`${keyBase}-l${i}`} className="ilink" href={href}>
          {label}
        </Link>
      )
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) {
    nodes.push(...renderBold(text.slice(last), `${keyBase}-tend`));
  }
  return nodes;
}

function renderBold(text: string, keyBase: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, idx) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyBase}-b${idx}`} style={{ fontWeight: 600 }}>
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={`${keyBase}-s${idx}`}>{p}</React.Fragment>;
  });
}

export function RichText({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const isUl = lines.every((l) => /^\s*-\s+/.test(l));
        const isOl = lines.every((l) => /^\s*\d+\.\s+/.test(l));
        if (isUl) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>
                  {renderInline(l.replace(/^\s*-\s+/, ""), `b${bi}-${li}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (isOl) {
          return (
            <ol key={bi}>
              {lines.map((l, li) => (
                <li key={li}>
                  {renderInline(l.replace(/^\s*\d+\.\s+/, ""), `b${bi}-${li}`)}
                </li>
              ))}
            </ol>
          );
        }
        return <p key={bi}>{renderInline(block, `b${bi}`)}</p>;
      })}
    </>
  );
}
