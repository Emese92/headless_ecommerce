import Link from "next/link";
import { request } from "./../../lib/datocms";
import { Image } from "react-datocms";
import Layout from "../../components/Layout";

const PRODUCTS_QUERY = `
query myQuery {
    allProducts(orderBy: _createdAt_ASC) {
      id
      slug
      name
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

export async function getStaticProps() {
  const data = await request({
    query: PRODUCTS_QUERY,
  });
  return {
    props: { data },
  };
}

export default function Products(props) {
  const { data } = props;
  const products = data.allProducts;
  return (
    <div className="app">
      <Layout>
      <div className="m-5 grid gap-10 mt-10 lg:gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductsPagePreview key={p.id} data={p} />
        ))}
      </div>
      </Layout>
    </div>
  );
}

const ProductsPagePreview = (props) => {
  const { data } = props;
  return (
    <div>
      <div className="relative overflow-hidden bg-gray-100 rounded-md hover:scale-105">
        <Link href={`/product/${data.slug}`}>
          <Image data={data.mainImage.responsiveImage} />
          <h2 className="pl-3 mt-2 text-lg">{data.name}</h2>
        </Link>
        <p className="pl-3 pb-2 text-lg font-semibold text-gray-500">
          {data.price} kr
        </p>
      </div>
    </div>
  );
};
