export type Attribution = {
  copyright: string;
  attributionText: string;
};

export type ContainerMetadata = {
  offset: number;
  limit: number;
  total: number;
  count: number;
};

export type GenericDataContainer<T> = {
  results: T[];
} & ContainerMetadata;

export type GenericDataWrapper<T> = {
  data: GenericDataContainer<T>;
} & Attribution;

export function createEmptyDataWrapper<T>() {
  return {
    attributionText: "",
    copyright: "",
    data: {
      offset: 0,
      count: 0,
      limit: 0,
      total: 0,
      results: new Array<T>(),
    },
  };
}
