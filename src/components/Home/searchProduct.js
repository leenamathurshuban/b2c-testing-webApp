import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row, Accordion, Form, Button } from "react-bootstrap";
import { useLazySearchProductsQuery } from "@/appRedux/apiSlice";
import axios from "axios";
import LoaderComp from "../Loader/loader_comp";
import Link from "next/link";
import { debounce } from "@/lib/helpers";

const SearchProduct = () => {
  const router = useRouter();
  const { query } = router.query;

  const [searchTerm, setSearchTerm] = useState(query || "");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [triggerSearch, { data: productsData, error, isLoading }] =
    useLazySearchProductsQuery();
  const [products, setProducts] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      setPage(1);
      setProducts([]);
      setHasMore(true);
      triggerSearch({ query, page: 1 });
    }
  }, [query]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isFetchingMore &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
        setIsFetchingMore(true);
      }
    }, 300),
    [isFetchingMore, hasMore]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isFetchingMore && page > 1) {
      triggerSearch({ query: searchTerm, page }).then((newProductsData) => {
        const newProducts = newProductsData.data?.[0]?.response || [];
        const endOfPagination = newProductsData.data?.[0]?.endofpagination === "true";
        
        if (newProducts.length > 0) {
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          setHasMore(!endOfPagination);
        } else {
          setHasMore(false); 
        }
        setIsFetchingMore(false);
      }).catch(() => {
        setIsFetchingMore(false);
      });
    }
  }, [isFetchingMore, page, searchTerm]);

  useEffect(() => {
    if (productsData && productsData.length > 0 && page === 1) {
      setProducts(productsData[0]?.response || []);
      setHasMore(productsData[0]?.response.length > 0); 
    }
  }, [productsData]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/searchProduct?query=${searchTerm}`);
      setPage(1);
      setProducts([]);
      setHasMore(true);
      triggerSearch({ query: searchTerm, page: 1 });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategorySelect = async (category) => {
    const firstCategoryPart = category.split(",")[0].trim();

    setSelectedCategory(firstCategoryPart);
    setProducts([]);
    setLoadingCategory(true);
    setPage(1);
    setHasMore(true); 

    try {
      const response = await axios.get(
        `https://shop.applefixpros.com/wp-json/custom-woo/v1/search/?quaryvar=${firstCategoryPart}&page=1`
      );
      setProducts(response.data?.[0]?.response || []);
      setHasMore(response.data?.[0]?.response.length > 0); 
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoadingCategory(false);
    }
  };

  const categories = productsData?.[0]?.categories?.split(",") || [];

  return (
    <section className="src_rusults">
      <Container>
        <Row className="mx-6">
          <Col md={12} lg={12}>
            <h2 className="gradiant_page_title">
              <b>Search Results</b>
            </h2>
          </Col>
          <Col md={12} lg={12}>
            <div className="serachinner">
              <input
                type="text"
                placeholder="Search Keywords....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button className="btn btn-info" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} lg={3}>
            <aside className="filter-sidebar">
              <h4 className="flt_title">Filter</h4>
              <Accordion defaultActiveKey={["0"]} alwaysOpen>
                <Accordion.Item eventKey="0" className="filter-group">
                  <Accordion.Header className="filter-group_heading">
                    Categories
                  </Accordion.Header>
                  <Accordion.Body className="filter-group_item">
                    <Form>
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <ul key={index} className="mb-3">
                            <li>
                              <Form.Check
                                inline
                                label={category.split(",")[0].trim()}
                                name="group1"
                                type="radio"
                                id={`category-${index}`}
                                checked={selectedCategory === category.split(",")[0].trim()}
                                onChange={() => handleCategorySelect(category)}
                              />
                            </li>
                          </ul>
                        ))
                      ) : (
                        <p>No categories available</p>
                      )}
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </aside>
          </Col>

          <Col md={8} lg={9}>
            <Row>
              <Col md={12} lg={12}>
                <div className="utility-bar">
                  <strong className="result_count">
                    We found{" "}
                    <span>({productsData?.[0]?.productcount || 0})</span>
                    results
                  </strong>
                </div>
              </Col>

              {(isLoading || loadingCategory) && (
                <div className="loader-center">
                  <LoaderComp />
                </div>
              )}

              {error ? (
                <Col md={12}>
                  <p>Error fetching data</p>
                </Col>
              ) : (
                products.map((product) => (
                  <Col sm={12} lg={4} md={6} xl={4} key={product.id}>
                    <Link href={`/${product.slug}?id=${product.id}`}>
                      <div className="new_shopmac_pc_box">
                        {product.tags && (
                          <div className="single_pro_heading tagspan">
                            <span>{product.tags}</span>
                          </div>
                        )}
                        <div className="new_shopmac_pc_img">
                          <img
                            alt={product.name}
                            src={product?.image_url[0] || "/assets/no_image.jpg"}
                            className="img-fluid"
                          />
                        </div>
                        <div className="new_shopmacpc_content">
                          <h2>{product.name}</h2>
                          <h5>
                            From ${(Number(product?.price) || 0).toFixed(2)}
                          </h5>
                          <Link
                            className="main_btn hvr-shutter-out-horizontal"
                            href={`/${product.slug}?id=${product.id}`}
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))
              )}
              {isFetchingMore && (
                <div>
                  <LoaderComp />
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default SearchProduct;
