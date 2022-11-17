import { Image, StructuredText } from "react-datocms";
import Link from "next/link";
import { request } from "../../lib/datocms";


export default function ProductDetail(props) {
    const { productData } = props;
  
    return (
      <div>
        <div style={{ maxWidth: "600px", marginTop: "20px" }}>
          <Image data={productData.mainImage.responsiveImage} />
          <h1>{productData.name}</h1>
          <p>
            {productData.price} kr
          </p>
          <StructuredText data={productData.description.value}/>
          <div style={{ marginTop: "50px" }}>
            <Link href="/">

            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const PATHS_QUERY = `
  query MyQuery {
    allProducts {
      name
      id
    }
  }
  `;
  export const getStaticPaths = async (context) => {
    const nameQuery = await request({
      query: PATHS_QUERY,
    });
  
    let paths = [];
    nameQuery.allProducts.map((p) => paths.push(`/product/${p.name}`));
  
    return {
      paths,
      fallback: "blocking",
    };
  };
  



const PRODUCT_QUERY = `
query myQuery($name: String) {
  product(filter: {name: {eq: $name}}) {
    id
    name
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
  const product = await request ({
    query: PRODUCT_QUERY,
    variables: { name: params.name },
  });
  return {
    props: {
      productData: product.product, 
    },
  };
};