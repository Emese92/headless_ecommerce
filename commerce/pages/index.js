import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { request } from "../lib/datocms";

const HOMEPAGE_QUERY = `
query myQuery {
  startpage {
    title
    id
    mainImage {
      url
    }
    content {
      value
    }
  }
}
`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data },
  };
}

export default function Home(props) {
  const { data } = props;
  const home = data.startpage;
  console.log(data);
  return (
    <div className="">
      <div>
        <StartPagePreview key={home.id} data={home} />
      </div>
    </div>
  );
}

const StartPagePreview = (props) => {
  const { data } = props;
  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};
