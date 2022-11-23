import { request } from "../lib/datocms";
import { Image, StructuredText } from "react-datocms";

const PAGES_QUERY = `
query myQuery {
    page {
        content {
          value
        }
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
          url
        }
        title
        id
        slug
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
export default function Contact(props) {
  const { data } = props;
  const pages = data.page;
  return (
    <div>
      <AboutPagePreview key={pages.id} data={pages} />
    </div>
  );
}

const AboutPagePreview = (props) => {
  const { data } = props;
  return (
    <div className="max-w-7xl pt-20 mx-auto text-center">
      <h1 className="mb-8 text-6xl font-semibold text-gray-900">
        {data.title}
      </h1>

      <div className="container flex flex-col items-center justify-center mx-auto rounded-lg ">
        <Image
          className="object-cover object-center w-3/4 mb-10 border rounded-lg shadow-md"
          data={data.mainImage.responsiveImage}
        ></Image>
      </div>
      <h3 className="mb-8 text-2xl font-semibold text-gray-600 text-center">
        <StructuredText data={data.content.value} />
      </h3>
    </div>
  );
};
