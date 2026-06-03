export const DEFAULTS = {
  PAGE: 1,
  LIMIT: 100,
  SORT_BY: 'createdAt',
} as const;

export const SPECIAL_QUERY_FILTERS = [
  'page',
  'limit',
  'sort',
  'fields',
] as const;
