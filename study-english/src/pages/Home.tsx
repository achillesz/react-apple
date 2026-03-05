import ProductList from "components/ProductList";
import { NEW_ARRIVALS_LIST, OFFER_LIST } from "@/assets/data/index.js";

import NewArrival from "components/NewArrival";
import type { NewArrivalProps } from "components/NewArrival";
import Offier from "@/components/Offer";
import type { OfferProps } from "@/components/Offer";
import withSoldOut from "@/hocs/withSoldOut";
import withBanner from "@/hocs/withBanner";
import ImageHero from "@/components/ImageHero";
import ProductHero from "@/components/ProductHero";
import { SUGGESTED_PROUDCT } from "@/assets/data/index.js";
import { useTranslation } from "react-i18next";

const NewArrivalWithSoldOutCheck = withSoldOut<NewArrivalProps>((props) => {
  const { title } = props;
  return <NewArrival {...props} title={"商品：" + title} />;
});

const OfferWithSoldOutCheck = withSoldOut<OfferProps>((props) => (
  <Offier {...props} />
));

const NewArrivalWithBanner = withBanner(NewArrivalWithSoldOutCheck, "手慢无");
const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ImageHero />
      <ProductHero
        product={SUGGESTED_PROUDCT.product}
        imageUrl={SUGGESTED_PROUDCT.imageSrc}
      />
      <ProductList
        title={t("home_page.newarrivals")}
        datalength={NEW_ARRIVALS_LIST.length}
      >
        {NEW_ARRIVALS_LIST.map((product) => (
          <NewArrivalWithBanner
            key={product.title}
            {...product}
            scale={1.05}
            onProductClick={(title) => alert(`Product clicked: ${title}`)}
          />
        ))}
      </ProductList>
      <ProductList title={t("home_page.offers")} datalength={OFFER_LIST.length}>
        {OFFER_LIST.map((product) => (
          <OfferWithSoldOutCheck
            key={product.title}
            {...product}
            onProductClick={(title) => alert(`Product clicked: ${title}`)}
          />
        ))}
      </ProductList>
    </div>
  );
};

export default Home;
