import client from "../db/urls";
import Head from "next/head";
export default function Page({ data }) {
  if (data) {
    return (
      <>
        <Head>
          <title>{data.title ? data.title : "Code Bin"}</title>
          <meta
            property="og:title"
            content={data.title ? data.title : "Code Bin"}
          />
          <meta
            property="og:image"
            content="https://cdn.discordapp.com/avatars/800966959268364288/a258d7a92f54b25d43db35a19b0c18af.png?size=2048"
          />
          <meta
            property="og:description"
            content={
              data.description
                ? data.description
                : "Store and Access your codes on the cloud"
            }
          />
          <meta name="theme-color" content="#02023a" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
            crossOrigin="anonymous"
          />
          <link rel="icon" href="/icon.png" />
        </Head>
        <form method="POST" action="/api/create">
          <div className="container">
            <h1 className="text-centre">Code Bin</h1>
            <header className="head">Views: {data.clicks}</header>
            <label htmlFor="tit" className="label">
              Title
            </label>
            <input
              className="input"
              type="text"
              placeholder="Code Bin"
              defaultValue={data.title ? data.title : "Code Bin"}
              id="tit"
              name="title"
              spellCheck="false"
              autoComplete="off"
              required
            />
            <label htmlFor="description" className="label">
              Description
            </label>
            <input
              className="input"
              type="text"
              placeholder="Description"
              defaultValue={
                data.description
                  ? data.description
                  : "Store and Access your codes on the cloud"
              }
              id="description"
              name="description"
              spellCheck="false"
              autoComplete="off"
              required
            />
            <label htmlFor="code" className="label">
              Code
            </label>
            <textarea
              className="textarea"
              type="text"
              id="code"
              name="code"
              defaultValue={data.code ? data.code : " "}
              spellCheck="false"
              autoComplete="off"
              required
            ></textarea>
            <input type="submit" className="btn" value="Create" />
          </div>
        </form>
        <style>{`
      body {
        background: #100f1c;
      }
      .head {
		    color: white;
        margin-bottom: 10px;
        font-size: 34px;
      }
      .text-centre, .label {
        color: white;
      }
      .textarea, .textarea:focus {
	      outline: none;
	      border: none;
      }
      container3{
        
      }
      .input{
        background-color: #1b1930;
        color: white;
        font-family: Consolas;
        font-size: 23px;
        border: none;
        margin-bottom: 28px;
      }
      .textarea {
        height: 97vh;
        background-color: #1b1930;
        color: white;
        font-family: Consolas;
        font-size: 23px;
        border: none;
      }
      .btn {
        border: 0;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgb(26, 115, 232);
        color: white;
        cursor: pointer;
        float: right;
        font-size: .875em;
        width:100%;
        margin: 0;
        padding: 8px 16px;
        transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
      }
      .btn:hover{
        background-color: rgb(25, 103, 210);
      }
`}</style>
      </>
    );
  } else return <pre>404 Not Found</pre>;
}

export async function getServerSideProps(context) {
  const coll = (await client).db("test").collection("pastes");
  const d = await coll
    .find({ name: context.query.id })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  let data = d.map(e => {
    return {
      name: e.name,
      code: e.code,
      clicks: e.clicks + 1,
      title: e.title,
      description: e.description,
    };
  })[0];
  if (!data) data = null;
  else
    await coll.updateOne({ name: context.query.id }, { $inc: { clicks: 1 } });
  return { props: { data, fallback: false } };
}
