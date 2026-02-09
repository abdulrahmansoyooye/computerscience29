import { groq } from "next-sanity";

export const allMaterialsQuery = groq`*[_type == "material" && isPublished == true] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  _createdAt,
  course->{name, code},
  category->{name},
  level->{name},
  semester->{name}
}`;

export const featuredMaterialsQuery = groq`*[_type == "material" && isFeatured == true && isPublished == true] [0...6] {
  _id,
  title,
  slug,
  description,
  _createdAt,
  course->{name, code},
  category->{name},
  level->{name}
}`;

export const materialBySlugQuery = groq`*[_type == "material" && slug.current == $slug][0] {
  _id,
  title,
  description,
  content,
  _createdAt,
  "fileUrl": file.asset->url,
  externalLink,
  course->{name, code},
  category->{name},
  level->{name},
  semester->{name},
  tags
}`;

export const allCoursesQuery = groq`*[_type == "course"] | order(code asc) {
  _id,
  name,
  code,
  level->{name},
  description
}`;

export const allAnnouncementsQuery = groq`*[_type == "announcement" && isActive == true] | order(date desc) {
  _id,
  title,
  content,
  date,
  type
}`;

