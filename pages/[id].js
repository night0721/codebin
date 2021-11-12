import client from "../db/urls";
import Head from "next/head";
import styles from "../styles/Home.module.css";
export default function Page({ data }) {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossOrigin="anonymous"
        />
      </Head>
      <form method="POST" action="/create">
        <div className="container">
          <h1 className={styles.head}>Code Bin</h1>
          <label htmlFor="tit" className={styles.label}>
            Title
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Code Bin"
            defaultValue={data.title ? data.title : "Code Bin"}
            id="tit"
            name="title"
            spellCheck="false"
            autoComplete="off"
            required
          />
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <input
            className={styles.input}
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
          <label htmlFor="code" className={styles.label}>
            Code
          </label>
          <textarea
            className={styles.textarea}
            type="text"
            id="code"
            name="code"
            defaultValue={data.code ? data.code : " "}
            spellCheck="false"
            autoComplete="off"
            required
          ></textarea>
          <input type="submit" className={styles.btn} value="Create" />
        </div>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  const d = await (await client)
    .db("test")
    .collection("pastes")
    .find({ name: context.query.id })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  const data = d.map(e => {
    return {
      name: e.name,
      code: e.code,
      clicks: e.clicks,
      title: e.title,
      description: e.description,
    };
  })[0];
  return { props: { data, fallback: false } };
}
