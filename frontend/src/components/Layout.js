import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CssBaseline } from "@material-ui/core";

const stripePromise = loadStripe(
  "pk_test_51Hi0CkCw3D7iMvxsPu8L7b7Bw6ug89NS9X9gq50DUI6vvFLecwQ8Usf1YRSveHlXiM4ZXYvVqrlh4OUVfLLsZYnv00U1czXugi"
);

const Layout = ({ children, title }) => {
  return (
    <>
      <CssBaseline />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};

export default Layout;
