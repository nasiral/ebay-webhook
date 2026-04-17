export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST") {
    return res.status(200).json({ success: true });
  }

  return res.status(200).json({ status: "OK" });
}
