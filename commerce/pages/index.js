import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { request } from "../lib/datocms";
import { Image } from "react-datocms";

const HOMEPAGE_QUERY = `
query myQuery {
  startpage {
    title
    id
    mainImage {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
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
      <div class="w-full h-96 bg-cover bg-center flex justify-center items-center">
        <Image data={data.mainImage.responsiveImage} />
      </div>
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-center text-5xl text-white font-bold drop-shadow-lg">
          {data.title}
        </h1>
        {/* <p class="mt-5 text-center text-lg text-white opacity-70"></p> */}
        <a
          class="mt-8 px-12 py-3 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-xl text-white/70 font-semibold drop-shadow-lg rounded-full"
          href="#"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};
