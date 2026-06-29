import { resolveAuthor } from "@/lib/blog/authors";
import type { BlogPost } from "@/lib/blog/types";

/**
 * AuthorBio - the "About the author" card shown at the end of an article.
 * Neon monogram chip + name + role + 1-2 sentence bio. Reinforces E-E-A-T by
 * attributing the guide to a real DOTDAY specialist. Identity comes from the
 * author registry via authorRef (falls back to the legacy author string).
 */
export function AuthorBio({ post }: { post: BlogPost }) {
  const a = resolveAuthor(post.authorRef, post.author);
  // No bio to show -> skip the card rather than render an empty shell.
  if (!a.bio) return null;
  return (
    <aside className="authorbio" aria-label={`About ${a.name}`}>
      <span className="authorbio-avatar" aria-hidden="true">
        {a.monogram}
      </span>
      <div className="authorbio-body">
        <div className="authorbio-name">{a.name}</div>
        <div className="authorbio-title">{a.title}</div>
        <p className="authorbio-bio">{a.bio}</p>
      </div>
    </aside>
  );
}
