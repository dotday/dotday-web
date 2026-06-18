import Link from "next/link";
import type { RelatedPost } from "@/lib/blog/types";

export function RelatedArticles({ posts }: { posts: RelatedPost[] }) {
  if (!posts?.length) return null;
  return (
    <section className="wrap" style={{ paddingTop: 40 }}>
      <div className="related-head">
        <h2>Keep reading</h2>
        <p>More guides on picking and installing the right fabric.</p>
      </div>
      <div className="rgrid">
        {posts.map((p, i) => {
          const card = (
            <>
              <div className="imgph r-169">
                <span>{p.category}</span>
              </div>
              <div className="pad">
                <span className="badge">{p.category}</span>
                <h3>{p.title}</h3>
                <span className="rtime">Read article</span>
              </div>
            </>
          );
          return p.url.startsWith("http") ? (
            <a className="rcard" href={p.url} key={i}>
              {card}
            </a>
          ) : (
            <Link className="rcard" href={p.url} key={i}>
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
