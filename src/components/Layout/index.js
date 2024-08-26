import { useRouter } from "next/router";
import FooterComp from "../Footer/footer";
import HeaderComp from "../Header/Header";
import Tobbar from "../Header/Topbar";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Tobbar />
      <HeaderComp />
      {children}
      <FooterComp />

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
