import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, Newspaper, RefreshCw } from 'lucide-react';

const updateInterval = 60 * 60 * 1000;
const maximumHeadlines = 6;
const categories = ['All topics', 'Cybersecurity', 'Developer tech', 'AI & machine learning'];

const formatDate = (date) => {
  if (!date) return 'Recent';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
};

const getHeadlines = async (signal) => {
  const response = await fetch(`/api/headlines?refresh=${Date.now()}`, {
    signal,
    cache: 'no-store',
    headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || `Headlines returned ${response.status}`);
  if (!Array.isArray(payload.headlines)) throw new Error('The headlines service returned an invalid response.');
  return payload;
};

const RecentHappenings = () => {
  const [headlines, setHeadlines] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All topics');
  const [isLoading, setIsLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);
  const [error, setError] = useState('');
  const requestRef = useRef(null);

  const refreshHeadlines = useCallback(async (showLoading = true) => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    if (showLoading) setIsLoading(true);
    setError('');

    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 15000);
    try {
      const payload = await getHeadlines(controller.signal);
      if (controller.signal.aborted) {
        if (timedOut) setError('The news feeds took too long to respond. Try again shortly.');
        return;
      }

      const { headlines: available, failedSources = [], fetchedAt } = payload;
      if (available.length === 0) {
        setError('Headlines are temporarily unavailable. Try again shortly.');
      } else {
        const sorted = available
          .map((headline) => ({
            ...headline,
            published: headline.published ? new Date(headline.published) : null,
          }))
          .sort((a, b) => (b.published?.getTime() ?? 0) - (a.published?.getTime() ?? 0));
        setHeadlines(sorted.slice(0, maximumHeadlines));
        const checkedAt = fetchedAt ? new Date(fetchedAt) : new Date();
        setLastChecked(Number.isNaN(checkedAt.getTime()) ? new Date() : checkedAt);
        if (failedSources.length > 0) {
          setError(`Some sources could not be reached (${failedSources.join(', ')}). Showing the latest available headlines.`);
        }
      }
    } catch (refreshError) {
      if (!controller.signal.aborted) {
        setError(refreshError instanceof Error ? refreshError.message : 'Headlines could not be refreshed. Please try again.');
      }
    } finally {
      window.clearTimeout(timeout);
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshHeadlines();
    const interval = window.setInterval(() => {
      void refreshHeadlines(false);
    }, updateInterval);

    return () => {
      window.clearInterval(interval);
      requestRef.current?.abort();
    };
  }, [refreshHeadlines]);

  const visibleHeadlines = headlines
    .filter((headline) => activeCategory === 'All topics' || headline.category === activeCategory);

  return (
    <section className="happenings-section" aria-labelledby="happenings-heading">
      <div className="site-container">
        <div className="happenings-heading">
          <div>
            <p className="section-kicker">Fresh from the feed</p>
            <h2 id="happenings-heading">Recent happenings.</h2>
            <p className="section-intro">
              Headlines on cybersecurity, AI, and developer technology—refreshed automatically every hour.
            </p>
          </div>
          <button
            type="button"
            className="happenings-refresh"
            onClick={() => void refreshHeadlines()}
            disabled={isLoading}
          >
            <RefreshCw size={15} className={isLoading ? 'is-spinning' : undefined} />
            {isLoading ? 'Updating' : 'Refresh headlines'}
          </button>
        </div>

        <div className="happenings-toolbar">
          <div className="happenings-filters" role="group" aria-label="Filter headlines by topic">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`happenings-filter${activeCategory === category ? ' is-selected' : ''}`}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="happenings-updated" aria-live="polite">
            {lastChecked
              ? `Updated ${new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(lastChecked)}`
              : 'Loading latest headlines'}
          </span>
        </div>

        {error && (
          <p className={`happenings-message${headlines.length ? ' is-warning' : ' is-error'}`} role="status">
            <AlertCircle size={16} />
            {error}
          </p>
        )}

        {isLoading && headlines.length === 0 ? (
          <div className="happenings-grid" aria-label="Loading headlines">
            {Array.from({ length: 3 }, (_, index) => (
              <div className="happening-skeleton" key={index} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            ))}
          </div>
        ) : visibleHeadlines.length > 0 ? (
          <div className="happenings-grid">
            {visibleHeadlines.map((headline) => (
              <article className="happening-card" key={`${headline.source}-${headline.link}`}>
                <div className="happening-meta">
                  <span className="happening-category"><Newspaper size={14} />{headline.category}</span>
                  <time dateTime={headline.published?.toISOString()}>{formatDate(headline.published)}</time>
                </div>
                <h3>{headline.title}</h3>
                <div className="happening-footer">
                  <span>{headline.source}</span>
                  <a href={headline.link} target="_blank" rel="noopener noreferrer">
                    Read story <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : !error && (
          <p className="happenings-message">No headlines are available for this topic right now.</p>
        )}

        <p className="happenings-attribution">
          Headlines are provided by The Hacker News, The GitHub Blog, and OpenAI News.
        </p>
      </div>
    </section>
  );
};

export default RecentHappenings;
