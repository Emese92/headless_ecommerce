import { request } from "../lib/datocms";
import { Image, StructuredText } from "react-datocms";
import Link from "next/link";
import Layout from "../components/Layout";


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
  return (
    <div className="app">
      <Layout>
        <div>
          <StartPagePreview key={home.id} data={home} />
        </div>
      </Layout>
    </div>
  );
}

const StartPagePreview = (props) => {
  const { data } = props;
  return (
    <div className="relative h-screen w-full">
      <div className="h-full">
        <Image
          data={data.mainImage.responsiveImage}
          className="h-full brightness-50"
        />
      </div>
      <div className="space-y-6 absolute inset-0 flex flex-col justify-center items-center max-w-3xl mx-auto text-center">
        <h1 className="font-extrabold text-white text-3xl sm:text-2xl md:text-5xl ">
          {data.title}
        </h1>
        <div className="space-y-4 text-white md:text-lg lg:text-xl sm:text-sm">
          <StructuredText data={data.content.value} />
        </div>
        <Link
          className="mt-8 px-12 py-3 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-xl text-white/70 font-semibold drop-shadow-lg rounded-full"
          href="/product/products"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
