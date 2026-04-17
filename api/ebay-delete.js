import crypto from "crypto";

export default function handler(req, res) {
  const challengeCode = req.query.challenge_code;
  const verificationToken = "ebay-webhook-fn39r5ias-methew636373-8928s-projects";
  const endpoint = "https://ebay-webhook-fn39r5ias-methew636373-8928s-projects.vercel.app/api/ebay-delete";

  if (challengeCode) {
    const hash = crypto.createHash("sha256");
    hash.update(challengeCode);
    hash.update(verificationToken);
    hash.update(endpoint);

    const responseHash = hash.digest("hex");

    return res.status(200).json({
      challengeResponse: responseHash
    });
  }

  res.status(200).send("OK");
}
