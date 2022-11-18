import { request } from "../lib/datocms";
import { Image, StructuredText } from "react-datocms";

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
    <div>
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
      <div>
        <div className="relative h-screen w-screen">
          <Image data={data.mainImage.responsiveImage} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50" />
        </div>
        <div className="space-y-6 absolute inset-0 flex flex-col justify-center items-center max-w-3xl mx-auto text-center">
          <h1 className="font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-snug">
            {data.title}
          </h1>
          <div className="space-y-4 text-white md:text-lg lg:text-xl">
            <StructuredText data={data.content.value}  />
          </div>
          <a
            className="mt-8 px-12 py-3 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-xl text-white/70 font-semibold drop-shadow-lg rounded-full"
            href="/product/products"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};
