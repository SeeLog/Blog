import contentful from 'contentful';

export interface BlogPost {
  title: string;
  category: string;
  tags: string[];
  slug: string;
  date: string;
  description: string;
  content: string;
}

export interface BlogPostSkeleton {
  contentTypeId: string;
  fields: BlogPost;
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});
