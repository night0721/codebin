// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(req.headers, req.query, req.params);
  res.status(200).json({ name: "John Doe" });
}
