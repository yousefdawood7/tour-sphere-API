import type { QueryFilter } from '../schemas/query.schema';

export type QueryString = { [key: string]: unknown } & QueryFilter;
