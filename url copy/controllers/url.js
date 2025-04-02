const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is not provided" });
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    viewHistory: {},
  });

  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.viewHistory.length,
    analytics: result.viewHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
};
