import { Attribution, ContainerMetadata } from "./Container";
import { Thumbnail } from "./Thumbnail";

export type CharacterDataWrapper = {
  data: CharacterDataContainer;
} & Attribution;

export type CharacterDataContainer = {
  results: Character[];
} & ContainerMetadata;

export type Character = {
  id: number;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Thumbnail;
};
