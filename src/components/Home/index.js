import Looking_macparts from "./Looking_macparts";
import Shoppopular from "./Shoppopular";
import BuyrepairComp from "./buysellandrepair";
import TrustedComp from "./trusted";

export default function HomeComp() {
  return (
    <>
      <Shoppopular />
      <BuyrepairComp />
      <Looking_macparts />
      <TrustedComp />
    </>
  );
}
