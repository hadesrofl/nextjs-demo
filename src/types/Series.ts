import { GenericDataContainer, GenericDataWrapper } from "./shared/Container";
import { ModelSummary } from "./shared/ModelSummary";

export type SeriesDataWrapper = GenericDataWrapper<Series>;

export type SeriesDataContainer = GenericDataContainer<Series>;

export type Series = {
  id: number;
  title: string;
} & ModelSummary;
