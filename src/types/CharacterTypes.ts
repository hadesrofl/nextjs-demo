import { GenericDataContainer, GenericDataWrapper } from "./shared/Container";
import { ModelSummary } from "./shared/ModelSummary";

export type CharacterDataWrapper = GenericDataWrapper<Character>;

export type CharacterDataContainer = GenericDataContainer<Character>;

export type Character = {
  id: number;
  name: string;
  modified: Date;
} & ModelSummary;
