const feeds = [
  {
    category: 'Cybersecurity',
    source: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews',
  },
  {
    category: 'Developer tech',
    source: 'The GitHub Blog',
    url: 'https://github.blog/feed/',
  },
  {
    category: 'AI & machine learning',
    source: 'OpenAI News',
    url: 'https://openai.com/news/rss.xml',
  },
];

const decodeXml = (value) => value
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([a-f\d]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'");

const readTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}\\s*>`, 'i'));
  return match ? decodeXml(match[1]).trim() : '';
};

const getFeedHeadlines = async (feed, signal) => {
  const response = await fetch(feed.url, {
    signal,
    cache: 'no-store',
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml',
      'Cache-Control': 'no-cache',
      'User-Agent': 'RokibPortfolioHeadlines/1.0',
    },
  });
  if (!response.ok) throw new Error(`${feed.source} returned ${response.status}`);

  const xml = await response.text();
  return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item\s*>/gi)]
    .map(([, item]) => {
      const title = readTag(item, 'title');
      const link = readTag(item, 'link');
      let parsedLink;
      try {
        parsedLink = new URL(link);
      } catch {
        return null;
      }
      if (!title || parsedLink.protocol !== 'https:') return null;

      const published = new Date(readTag(item, 'pubDate'));
      return {
        title,
        link: parsedLink.href,
        published: Number.isNaN(published.getTime()) ? null : published.toISOString(),
        category: feed.category,
        source: feed.source,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (Date.parse(b.published ?? '') || 0) - (Date.parse(a.published ?? '') || 0))
    .slice(0, 2);
};

export default async function handler(_request, response) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store, max-age=0');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const results = await Promise.allSettled(
      feeds.map((feed) => getFeedHeadlines(feed, controller.signal)),
    );
    const headlines = results.flatMap((result) => (
      result.status === 'fulfilled' ? result.value : []
    )).sort((a, b) => (Date.parse(b.published ?? '') || 0) - (Date.parse(a.published ?? '') || 0));
    const failedSources = results.flatMap((result, index) => (
      result.status === 'rejected' ? [feeds[index].source] : []
    ));

    if (headlines.length === 0) {
      response.statusCode = 502;
      response.end(JSON.stringify({
        error: controller.signal.aborted
          ? 'The news feeds took too long to respond.'
          : 'The news feeds are temporarily unavailable.',
        failedSources,
      }));
      return;
    }

    response.statusCode = 200;
    response.end(JSON.stringify({
      headlines: headlines.slice(0, 6),
      failedSources,
      fetchedAt: new Date().toISOString(),
    }));
  } catch {
    response.statusCode = 502;
    response.end(JSON.stringify({
      error: controller.signal.aborted
        ? 'The news feeds took too long to respond.'
        : 'The headlines could not be fetched.',
    }));
  } finally {
    clearTimeout(timeout);
  }
}
