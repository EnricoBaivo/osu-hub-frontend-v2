// interfaces/AnimeResponse.ts

// Represents the recommendation information for an anime
interface MediaRecommendation {
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  siteUrl: string;
  coverImage: {
    extraLarge: string;
    large: string;
    color: string;
  };
}

// Represents an edge in the recommendations list
interface RecommendationEdge {
  node: {
    mediaRecommendation: MediaRecommendation;
  };
}

// Represents the recommendation data for the anime
interface Recommendations {
  edges: RecommendationEdge[];
}

// Represents an individual ranking for the anime
interface Ranking {
  type: string;
  rank: number;
  context: string;
  format : string;
  year : number;
  season : string | null;
  allTime : boolean;
}

// Represents an individual tag for the anime
interface Tag {
  name: string;
  rank: number;
}

// Represents the cover image details of the anime
interface CoverImage {
  extraLarge: string;
  large: string;
  color: string;
}

// Represents the trailer information for the anime
export interface Trailer {
  id: string;
  thumbnail: string;
}

// Represents the title information of the anime in various languages
interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

// Represents the main media data of the anime
export interface Media {
  id: number;
  episodes: number;
  status: string;
  recommendations: Recommendations;
  genres: string[];
  rankings: Ranking[];
  tags: Tag[];
  title: Title;
  siteUrl: string;
  description: string;
  trailer: Trailer;
  coverImage: CoverImage;
}

// Represents the response data structure from the API
export interface AnimeResponse {
  data: {
    Media: Media;
  };
}
