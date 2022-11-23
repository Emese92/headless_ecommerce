import { request } from "../lib/datocms";
import { Image, StructuredText } from "react-datocms";
import Layout from "../components/Layout";

const PAGES_QUERY = `
query myQuery{
  page{
    title
    id
    mainImage {
      responsiveImage {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    slug
    content {
      value
    }
  }
  }  
  
`;

export async function getStaticProps() {
  const data = await request({
    query: PAGES_QUERY,
  });
  return {
    props: { data },
  };
}

export default function About(props) {
  const { data } = props;
  const about = data.page;
  return (
    <div>
      <Layout>
        <div>
          <AboutPagePreview key={about.title} data={about} />
        </div>
      </Layout>
    </div>
  );
}

const AboutPagePreview = (props) => {
  const { data } = props;
  return (
    <div className="max-w-7xl pt-20 mx-auto text-center">
      <h1 className="mb-8 text-6xl font-semibold text-gray-900">{data.title}</h1>

      <div className="container flex flex-col items-center justify-center mx-auto rounded-lg ">
        <Image
          className="object-cover object-center w-3/4 mb-10 border rounded-lg shadow-md"
          data={data.mainImage.responsiveImage}
        ></Image>
      </div>
      <div className="mb-8 text-2xl font-semibold text-gray-600 text-center">
        <StructuredText data={data.content.value} />
      </div>
    </div>
  );
};
