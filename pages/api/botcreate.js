import client from "../../db/urls";
import { makeId } from "./create";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const coll = (await client).db("test").collection("pastes");
    const d = await coll
      .find({ code: body.code })
      .sort({ metacritic: -1 })
      .limit(1)
      .toArray();
    if (d.length)
      res.status(200).send({ name: `http://localhost:3000/${d[0].name}` });
    let tit = body.title;
    if (tit.length > 25) tit = `${tit.slice(0, 25)}...`;
    const obj = {
      name: makeId(9),
      description: body.description,
      title: tit,
      code: body.code,
      clicks: 0,
    };
    await coll.insertOne(obj);
    res.status(200).send({ name: `http://localhost:3000/${obj.name}` });
  } else res.status(405).send("Method Not Allowed");
}
