const Parser = require('rss-parser');
const https = require('https');

const parser = new Parser({
  requestOptions: {
    agent: new https.Agent({ rejectUnauthorized: false }) // relax TLS if needed
  }
});

exports.getNPRNews = async (req, res) => {
  try {
    const feed = await parser.parseURL('https://feeds.npr.org/1001/rss.xml');
    const articles = feed.items.slice(0, 10).map(item => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      summary: item.contentSnippet
    }));
    res.json(articles);
  } catch (err) {
    console.error('RSS fetch failed:', err.message);
    res.status(500).json({ message: 'Failed to fetch NPR news' });
  }
};
