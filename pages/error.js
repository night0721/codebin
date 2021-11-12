import Head from "next/head";
import "../styles/Error.module.css";
import client from "../db/urls";
import style from "../styles/Error.module.css";
import Router, { useRouter } from "next/router";
import Document from "next/document";
import { useEffect } from "react";
export default function Page({ code }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error</title>
        <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
        <link
          href="https://fonts.googleapis.com/css?family=Encode+Sans+Semi+Condensed:100,200,300,400"
          rel="stylesheet"
        ></link>
      </Head>
      <script></script>
      <div className="loading">
        <h1>
          A Bin For This Code Already Exists At: <a href={code}>{code}</a>
        </h1>
        <div className="gears">
          <div className="gear one">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="gear two">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="gear three">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
// export async function getServerSideProps(context) {
//   const d = await (await client)
//     .db("test")
//     .collection("pastes")
//     .find({ name: context.query.id })
//     .sort({ metacritic: -1 })
//     .limit(1)
//     .toArray();
//   const data = d.map(e => {
//     return { name: e.name };
//   })[0];
//   return {
//     props: { code: "http://localhost:3000/3dNg4oIR_", fallback: false },
//   };
//}
