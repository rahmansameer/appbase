export const getToolsQuery = `
  *[_type == "tools"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "logo": select(logo != null => logo.asset->url, null)
  }
`;

export const getToolsByKeywords = `
  *[_type == "tools" && count((categories[])[@ in $keywords]) > 0]{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "logo": select(logo != null => logo.asset->url, null)
  }
`;

export const getCollectionBySlug = `
*[_type == "collection" && slug.current == $slug][0]{
  title,
  description,
  type,
  seoTitle,
  seoDescription,

  "tools": tools[]->{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    "logo": logo.asset->url
  },

  content[]{
    title,
    content
  }
}
`;

export const getAllItems = `
*[_type == "tools"]{
  _id,
  name,
  tagline,
  "slug": slug.current,
  shortDescription,
  categories,
  pricingType,
  "logo": select(logo != null => logo.asset->url, null)
}
`;

export const getProductPageBySlug = `
*[_type=="productPage" && tool->slug.current == $slug][0]{
  title,
  description,
  content,
  tool->{
    name,
    "slug": slug.current,
    "logo": select(logo != null => logo.asset->url, null),
    tagline,
    shortDescription,
    pricingType,
    startingPrice,
    website,
    affiliateLink
  }
}
`;
