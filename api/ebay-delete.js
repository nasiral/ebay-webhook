const crypto = require('crypto');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const challengeCode = req.query.challenge_code;
    
    // eBay sends a challenge code to test if we are real
    if (challengeCode) {
      // THE EXACT TOKEN YOU MUST TYPE IN EBAY DASHBOARD
      const verificationToken = "ebay-webhook-1lw26ucgh-methew636373-8928s-projects"; 
      
      // Using the EXACT URL you provided
      const endpointURL = "https://ebay-webhook-1lw26ucgh-methew636373-8928s-projects.vercel.app/api/ebay-delete"; 

      // Computes matching signature hash
      const stringToHash = challengeCode + verificationToken + endpointURL;
      const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');

      return res.status(200).json({ challengeResponse: hash });
    }
  }

  // Handle actual ping/delete requests to avoid errors later
  return res.status(200).send("OK");
}
