export const GTM_ID = "GTM-K8LS534F";

//process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;

export const pageview = url => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
