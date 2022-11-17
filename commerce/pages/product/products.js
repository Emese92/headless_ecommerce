import Link from "next/link";
import { request } from "./../../lib/datocms";
import { Image } from "react-datocms";

const PRODUCTS_QUERY = `
query myQuery {
    allProducts(orderBy: _createdAt_ASC) {
      id
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
  console.log(products);
  console.log(data);
  return (
    <div className="">
      <div className="grid md:grid-cols-3 sm:grid-cols-2">
        {products.map((p) => (
          <ProductsPagePreview key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}

const ProductsPagePreview = (props) => {
  const { data } = props;
  return (
    <div className="flex-col items-center p-6 space-y-6 shadow-md overflow-hidden m-3">
      <Image data={data.mainImage}  />
      <div>
        <Link href={`/product/${data.slug}`}>
          <Image data={data.mainImage.responsiveImage} />
          <p>{data.name}</p>
        </Link>
        <p>{data.price} kr</p>
      </div>
    </div>
  );
};
