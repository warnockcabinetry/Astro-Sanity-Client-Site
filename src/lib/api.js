import { useSanityClient } from "astro-sanity";

export async function getAllPosts() {
  const client = useSanityClient();
  const query = '*[_type == "post"]';
  const params = {};
  const posts = await client.fetch(query, params);
  return posts;
}

export async function getAllProjects() {
  const client = useSanityClient();
  const query = '*[_type == "projects"]';
  const params = {};
  const projects = await client.fetch(query, params);
  return projects;
}


// export async function getAllGalleryImages(){
//   const client = useSanityClient();
//   const query = '*[_type == "projects"]';
//   const params = '{galleryImages}';
//   const gallerys = await client.fetch(query, params);
//   return gallerys;
// }

export async function getAllsliderImages() {
  const sliderQuery = `*[_type == "slider"]`;
  const sliderParams = {};
  const sliderImages = await useSanityClient().fetch(sliderQuery, sliderParams);
  return sliderImages;
}

export async function getAllCategories() {
  const categoryQuery = '*[_type == "category"]';
  const categoryParams = {};
  const categories = await useSanityClient().fetch(
    categoryQuery,
    categoryParams
  );
  return categories;
}

export async function getAllPromotions() {
  const homeQuery = '*[_type == "promotion"]';
  const homeParams = {};
  const homeImages = await useSanityClient().fetch(homeQuery, homeParams);

  // Keep homepage cards in a fixed business-defined order.
  const cardOrder = ["kitchens", "wardrobes", "built-ins"];
  const getRank = (title = "") => {
    const normalized = title.toLowerCase().trim();
    const matchIndex = cardOrder.findIndex((item) => normalized.includes(item));
    return matchIndex === -1 ? Number.MAX_SAFE_INTEGER : matchIndex;
  };

  return [...homeImages].sort((a, b) => {
    const rankA = getRank(a?.title);
    const rankB = getRank(b?.title);

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    return (a?.title || "").localeCompare(b?.title || "");
  });
}


//page queries

export async function getAllAboutUs() {
  const aboutUsQuery = '*[_type == "page" && title match "About"]';
  const aboutUsParams = {};
  const aboutUs = await useSanityClient().fetch(aboutUsQuery, aboutUsParams);
  return aboutUs
}

export async function getAllContact() {
  const catalogQuery = '*[_type == "page" && title match "Contact"]';
  const catalogParams = {};
  const catalog = await useSanityClient().fetch(catalogQuery, catalogParams);
  return catalog
}

export async function getAllGallery() {
  const galleryQuery = '*[_type == "page" && title match "gallery"]';
  const galleryParams = {};
  const gallery = await useSanityClient().fetch(galleryQuery, galleryParams);
  return gallery;
}

export async function getAllHome() {
  const homeQuery = '*[_type == "page" && title match "Home"]';
  const homeParams = {};
  const home = await useSanityClient().fetch(homeQuery, homeParams);
  return home;
}

export async function getAllMetaData() {
  const metaQuery = '*[_type == "MetaData"]';
  const metaParams = {};
  const meta = await useSanityClient().fetch(metaQuery, metaParams);
  return meta;
}