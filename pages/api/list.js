import client from "../..";
export default async function handler(req, res) {
  const d = await (await client)
    .db("Data")
    .collection("pastes")
    .find({})
    .sort({ metacritic: -1 })
    .toArray();
  const data = d.map(e => {
    return {
      name: e.name,
      code: e.code,
      clicks: e.clicks,
      title: e.title,
      description: e.description,
    };
  });
  res.status(200).send(data);
}
