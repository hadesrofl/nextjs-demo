import { Attribution, ContainerMetadata } from "./Container";
import { Thumbnail } from "./Thumbnail";

export type SeriesDataWrapper = {
  data: SeriesDataContainer;
} & Attribution;

export type SeriesDataContainer = {
  results: Series[];
} & ContainerMetadata;

export type Series = {
  id: number;
  title: string;
  description: string;
  thumbnail: Thumbnail;
};
