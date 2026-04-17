export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('eBay deletion request:', req.body);

    return res.status(200).json({
      status: "received"
    });
  }

  res.status(200).send("OK");
}
