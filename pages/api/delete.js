import client from "../../db/urls";
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const key = req.headers.authorization;
    if (!key || key !== process.env.Key)
      res.status(401).send({ error: "Unauthorized", code: 401 });
    else {
      await (
        await client
      )
        .db("test")
        .collection("pastes")
        .deleteOne({ name: JSON.parse(req.body).name });
      res.status(200).send("Deleted data");
    }
  } else res.status(405).send("Method not allowed");
}
