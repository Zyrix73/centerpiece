import { useState, useRef, useEffect } from 'react';
import { Clock, Calendar, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import PageShell, { OrnamentDivider } from './components/PageShell';
import { getPublishedPosts, getPostBySlug, type BlogContentBlock, type BlogPost } from './data/blogPosts';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function ContentBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="font-serif text-2xl md:text-3xl text-amber-100 mt-10 mb-4 leading-tight">
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="text-sand-300 text-base md:text-[1.05rem] leading-[1.8] mb-5">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul className="space-y-3 mb-6 ml-1">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-sand-300 text-base leading-[1.7]">
              <span className="text-amber-500 mt-1.5 flex-shrink-0" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" /></svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure className="my-8">
          <div className="relative rounded-sm overflow-hidden border border-amber-900/30">
            <img
              src={block.src}
              alt={block.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120d0b]/30 to-transparent" aria-hidden="true" />
          </div>
          {block.alt && (
            <figcaption className="text-sand-600 text-xs text-center mt-3 italic">
              {block.alt}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

function RelatedPost({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex items-center gap-4 p-4 border border-amber-900/25 hover:border-amber-700/50 rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 transition-all duration-300"
    >
      <div className="w-20 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-[#1a1210]">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-amber-400/70 text-[10px] tracking-widest uppercase mb-1">{post.category}</p>
        <p className="font-serif text-sm text-amber-100 group-hover:text-white transition-colors leading-snug line-clamp-2">
          {post.title}
        </p>
      </div>
      <ArrowRight size={16} className="text-amber-500/50 group-hover:text-amber-400 transition-colors flex-shrink-0" aria-hidden="true" />
    </a>
  );
}

export default function BlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  const heroRef = useInView();

  if (!post || post.status !== 'published') {
    return (
      <PageShell pageTitle="Article Not Found | Centerpiece Hookah Lounge" pageDescription="This blog article could not be found.">
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-3xl text-amber-100 mb-4">Article Not Found</h1>
            <p className="text-sand-400 mb-8">This article may not have been published yet. Check back soon!</p>
            <a href="/blog" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 border border-amber-700/40 hover:border-amber-600/70 px-6 py-3 rounded-sm transition-all duration-300">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Blog
            </a>
          </div>
        </div>
      </PageShell>
    );
  }

  const published = getPublishedPosts();
  const related = published.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.metaDescription,
    'image': post.heroImage,
    'datePublished': post.publishDate,
    'dateModified': post.publishDate,
    'author': {
      '@type': 'Organization',
      'name': 'Centerpiece Hookah Lounge',
      'url': 'https://centerpiecehookahlounge.com',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Centerpiece Hookah Lounge',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://centerpiecehookahlounge.com/images/centerpiece-logo-square.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://centerpiecehookahlounge.com/blog/${post.slug}`,
    },
    'keywords': post.keywords.join(', '),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://centerpiecehookahlounge.com/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://centerpiecehookahlounge.com/blog' },
      { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': `https://centerpiecehookahlounge.com/blog/${post.slug}` },
    ],
  };

  return (
    <PageShell
      pageTitle={post.metaTitle}
      pageDescription={post.metaDescription}
      jsonLd={[jsonLd, breadcrumbLd]}
    >
      <article>
        <section className="relative min-h-[55vh] flex items-end justify-center overflow-hidden px-6 pt-20">
          <div className="absolute inset-0">
            <img
              src={post.heroImage}
              alt={post.heroImageAlt}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120d0b]/70 via-[#120d0b]/40 to-[#120d0b]" />
          </div>

          <div
            ref={heroRef.ref}
            className={`relative z-10 max-w-3xl mx-auto w-full pb-10 transition-all duration-700 ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <nav className="flex items-center gap-2 text-sand-500 text-xs mb-4" aria-label="Breadcrumb">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/blog" className="hover:text-amber-400 transition-colors">Blog</a>
              <span aria-hidden="true">/</span>
              <span className="text-amber-400 truncate">{post.category}</span>
            </nav>

            <span className="inline-block text-[10px] tracking-[0.3em] uppercase font-medium bg-[#120d0b]/80 border border-amber-700/30 px-3 py-1 rounded-full text-amber-400 mb-4">
              {post.category}
            </span>

            <h1 className="font-serif text-3xl md:text-5xl text-amber-100 mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sand-400 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {post.readTime} min read
              </span>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#120d0b] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="prose prose-invert max-w-none">
              {post.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>

            {post.keywords.length > 0 && (
              <div className="mt-12 pt-6 border-t border-amber-900/20">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={14} className="text-amber-500/60" aria-hidden="true" />
                  {post.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-xs text-sand-600 border border-amber-900/20 px-2.5 py-1 rounded-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 p-8 border border-amber-700/30 rounded-sm bg-gradient-to-br from-amber-950/20 to-[#1a1210]/60 text-center">
              <OrnamentDivider />
              <h3 className="font-serif text-2xl text-amber-100 mb-3">Ready to Experience Premium Hookah?</h3>
              <p className="text-sand-400 text-sm leading-relaxed mb-5 max-w-md mx-auto">
                Visit Centerpiece Hookah Lounge in Westwood — 50+ premium flavors, expert curation,
                and a welcoming atmosphere. Open nightly.
              </p>
              <a
                href="/visit-us"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 border border-amber-700/40 hover:border-amber-600/70 px-6 py-3 rounded-sm transition-all duration-300 text-sm tracking-wide"
              >
                Plan Your Visit
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-16 px-6 bg-[#150f0d] relative overflow-hidden">
            <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="text-center mb-8">
                <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Keep Reading</p>
                <h2 className="font-serif text-2xl md:text-3xl text-amber-100">More from the Blog</h2>
                <OrnamentDivider />
              </div>
              <div className="space-y-4">
                {related.map((rp) => (
                  <RelatedPost key={rp.slug} post={rp} />
                ))}
              </div>
            </div>
          </section>
      )}
      </article>
    </PageShell>
  );
}
