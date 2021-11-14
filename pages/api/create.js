import client from "../../db/urls";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const coll = (await client).db("test").collection("pastes");
    const d = await coll
      .find({ code: body.code })
      .sort({ metacritic: -1 })
      .limit(1)
      .toArray();
    if (d.length) res.redirect(`/error?code=${d[0].name}`);
    else {
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
      res.redirect(`/${obj.name}`);
    }
  } else res.status(405).send("Method Not Allowed");
}
export function makeId(length = 5) {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  while (length-- > 0) {
    str += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return str;
}
