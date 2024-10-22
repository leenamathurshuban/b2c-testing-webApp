import { useRouter } from "next/router";
import FooterComp from "../Footer/footer";
import HeaderComp from "../Header/Header";
import Tobbar from "../Header/Topbar";
import Breadcrumb from "../Breadcrumb";
import Halloween_Sales from "../halloween_sales";
import FlowerApp from "../FlowerApp";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Tobbar />
      <HeaderComp />
      <Halloween_Sales/>
      <Breadcrumb />
      {children}
      <FooterComp />
      <FlowerApp />
      {/* {router.pathname !== "/" && (
        <>
          <Tobbar />
          <HeaderComp />{" "}
        </>
      )}
      {children}
      {router.pathname !== "/" && <FooterComp />} */}
    </>
  );
}
