import { Image, StructuredText } from "react-datocms";
import Link from "next/link";
import { request } from "../../lib/datocms";

export default function ProductDetail(props) {
  const { productData } = props;

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      <div className="w-full max-w-md border rounded shadow-lg mt-20">
        <div>
          <Image data={productData.mainImage.responsiveImage} />
        </div>
      </div>
      <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <Link href="/product/products">
          <p className="text-gray-500">Back to All Products</p>
        </Link>
        <div>
          <h1 className="font-extrabold text-3xl text-blue-800 py-2 sm:py-4">
            {productData.name}
          </h1>
          <div className="space-y-6 font-medium text-lg">
            <StructuredText data={productData.description.value} />
          </div>
          <p className="text-xl text-blue-800 font-medium py-4 px-1">
            {productData.price} kr
          </p>
        </div>
      </div>
    </div>
  );
}

const PATHS_QUERY = `
  query MyQuery {
    allProducts {
      slug
    }
  }
  `;
export const getStaticPaths = async (context) => {
  const nameQuery = await request({
    query: PATHS_QUERY,
  });

  let paths = [];
  nameQuery.allProducts.map((p) => paths.push(`/product/${p.slug}`));

  return {
    paths,
    fallback: "blocking",
  };
};

const PRODUCT_QUERY = `
query myQuery($slug: String) {
  product(filter: {slug: {eq: $slug}}) {
    id
    name
    slug
    description {
      value
    }
    price
    mainImage {
      url
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
  }
}

  
`;

export const getStaticProps = async ({ params }) => {
  const product = await request({
    query: PRODUCT_QUERY,
    variables: { slug: params.slug },
  });
  return {
    props: {
      productData: product.product,
    },
  };
};
