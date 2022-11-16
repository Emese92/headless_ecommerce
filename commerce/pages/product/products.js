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
      <div>
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
    <div style={{ maxWidth: "400px", marginBottom: "50px" }}>
      <Image data={data.mainImage} />
      <h2>
        <Link href={`/product/${data.slug}`}>
          <Image data={data.mainImage.responsiveImage} />
          <p>{data.name}</p>
        </Link>
      </h2>
      <div style={{ fontWeight: "bold" }}>{data.price}</div>
    </div>
  );
};
