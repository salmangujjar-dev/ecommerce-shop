interface FeaturedLink {
  text: string;
  to: string;
}

export interface Feature {
  id: string;
  coverImg: string;
  heading: string;
  description: string;
  link: FeaturedLink;
}
