export type NextPageParams<T extends Record<string, string>> = {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type RouteContext<T extends Record<string, string> = {}> = {
  params: T;
};