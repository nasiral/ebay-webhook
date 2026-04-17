const crypto = require('crypto');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const challengeCode = req.query.challenge_code;
    
    // eBay sends a challenge code to test if we are real
    if (challengeCode) {
      // THE EXACT TOKEN YOU MUST TYPE IN EBAY DASHBOARD
      // Note: eBay token MUST be 32 to 80 chars long. DO NOT make it shorter.
      const verificationToken = "ebay-webhook-1lw26ucgh-methew636373-8928s-projects";
      
      // DYNAMIC URL DETECTION
      // This automatically captures whatever random URL Vercel assigns to your project!
      const host = req.headers['x-forwarded-host'] || req.headers.host;
      const endpointURL = `https://${host}/api/ebay-delete`;

      // Computes matching signature hash automatically
      const stringToHash = challengeCode + verificationToken + endpointURL;
      const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');

      return res.status(200).json({ challengeResponse: hash });
    }
  }

  // Handle actual ping/delete requests to avoid errors later
  return res.status(200).send("OK");
}
