import contentful, {
  type Asset,
  type EntryFieldTypes,
  type EntrySkeletonType,
} from 'contentful';

export interface BlogPost {
  title: string;
  image: Asset;
  category: CategorySkeleton;
  tags: TagSkeleton[];
  slug: string;
  date: string;
  description: string;
  content: string;
}

export interface Category {
  title: string;
  image: string;
  description: string;
  sort: number;
  slug: string;
  isMain: boolean;
}

export interface Tag {
  image: string;
  title: string;
  slug: string;
  parentCategory: CategorySkeleton;
}

export type BlogPostSkeleton = EntrySkeletonType<BlogPost>;
export type CategorySkeleton = EntrySkeletonType<Category>;
export type TagSkeleton = EntrySkeletonType<Tag>;

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});
