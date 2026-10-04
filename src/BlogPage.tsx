import { useState, useRef, useEffect } from 'react';
import { BookOpen, Clock, ArrowRight, Calendar } from 'lucide-react';
import PageShell, { OrnamentDivider } from './components/PageShell';
import { getPublishedPosts, getUpcomingPosts, type BlogPost } from './data/blogPosts';

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

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const isUpcoming = post.status === 'upcoming';
  return (
    <article
      className={`group relative overflow-hidden rounded-sm border border-amber-900/25 hover:border-amber-700/50 transition-all duration-500 flex flex-col bg-[#1a1210]/60 ${
        isUpcoming ? 'opacity-50' : ''
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1a1210]">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isUpcoming ? '' : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#150f0d]/60 via-[#150f0d]/15 to-transparent" aria-hidden="true" />
        {isUpcoming && (
          <div className="absolute top-3 right-3 bg-[#120d0b]/90 border border-amber-700/40 px-3 py-1 rounded-full">
            <span className="text-amber-400/80 text-[10px] tracking-widest uppercase">Coming Soon</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium bg-[#120d0b]/80 border border-amber-700/30 px-3 py-1 rounded-full text-amber-400">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-amber-100 mb-2 leading-tight group-hover:text-white transition-colors">
          {post.title}
        </h3>
        <p className="text-sand-400 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-3 border-t border-amber-900/20">
          <div className="flex items-center gap-3 text-sand-600 text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} aria-hidden="true" />
              {formatDate(post.publishDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>
          {isUpcoming ? (
            <span className="text-amber-600/50 text-xs tracking-wide">Soon</span>
          ) : (
            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs tracking-wide transition-colors"
            >
              Read
              <ArrowRight size={12} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const heroRef = useInView();
  const published = getPublishedPosts();
  const upcoming = getUpcomingPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Centerpiece Hookah Lounge Blog',
    'description': 'In-depth articles about all things hookah — beginner guides, shisha education, equipment reviews, flavor pairings, and hookah culture.',
    'url': 'https://centerpiecehookahlounge.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'Centerpiece Hookah Lounge',
      'url': 'https://centerpiecehookahlounge.com',
    },
  };

  return (
    <PageShell
      pageTitle="Hookah Blog | Guides, Tips & Culture — Centerpiece Hookah Lounge"
      pageDescription="In-depth articles about all things hookah — beginner guides, shisha education, equipment reviews, flavor pairings, and hookah culture from Centerpiece Hookah Lounge in Westwood, Los Angeles."
      jsonLd={jsonLd}
    >
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7518765/pexels-photo-7518765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Premium hookahs arranged on a bar counter with warm ambient lighting"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120d0b]/80 via-[#120d0b]/50 to-[#120d0b]" />
        </div>

        <div
          ref={heroRef.ref}
          className={`relative z-10 text-center max-w-3xl mx-auto transition-all duration-700 ${
            heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-amber-600/40 bg-amber-950/30 mb-4">
            <BookOpen size={26} className="text-amber-500" aria-hidden="true" />
          </div>
          <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">The Centerpiece Blog</p>
          <h1 className="font-serif text-4xl md:text-6xl text-amber-100 mb-4 leading-tight">
            All Things Hookah
          </h1>
          <OrnamentDivider />
          <p className="text-sand-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed mt-4">
            In-depth guides, expert tips, and stories from the world of hookah —
            from beginner basics to the craft of premium shisha.
          </p>
        </div>
      </section>

      {published.length > 0 && (
        <section className="py-16 px-6 bg-[#120d0b] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Latest Articles</p>
              <h2 className="font-serif text-3xl md:text-4xl text-amber-100">Fresh Off the Bowl</h2>
              <OrnamentDivider />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {published.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="py-16 px-6 bg-[#150f0d] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">More on the Way</p>
              <h2 className="font-serif text-3xl md:text-4xl text-amber-100">Upcoming Articles</h2>
              <OrnamentDivider />
              <p className="text-sand-400 max-w-lg mx-auto text-sm leading-relaxed mt-4">
                We publish a new article every week. Here\'s what\'s coming next.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
