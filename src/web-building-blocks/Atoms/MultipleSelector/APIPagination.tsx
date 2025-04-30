import { useRef } from 'react';

import { InfiniteScrollProvider } from '../InfiniteScroll';

import { transToGroupOption } from './utils';

import { Option, GroupOption } from './types';

export type ApiPaginationAndSearch = {
  onSearchSync?: never;
  onSearch?: (value: string) => Promise<Option[]>;
  fetchNextPage?: (page: number, searchQuery: string) => Promise<{ data: Option[]; hasMore: boolean }>;
};

type ApiPaginationAndSearchProps = ApiPaginationAndSearch & {
  groupBy?: string;
  search: string;
  hasInitialData: boolean;
  setOptions: React.Dispatch<React.SetStateAction<GroupOption>>;
  setIsSearchLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement | React.ReactElement[];
};

const APIPagination = ({
  fetchNextPage,
  groupBy,
  setIsSearchLoading,
  setOptions,
  search = '',
  hasInitialData,
  children,
}: ApiPaginationAndSearchProps): React.ReactElement => {
  const localSearchQuery = useRef<string>(search);

  if (fetchNextPage) {
    return (
      <InfiniteScrollProvider
        searchQuery={search}
        hasInitialData={hasInitialData}
        fetchItems={async (page, searchQuery) => {
          if (localSearchQuery.current !== searchQuery) {
            setIsSearchLoading?.(true);
          }
          const res = await fetchNextPage!(page, searchQuery);

          setOptions((prev) => {
            let z = [];
            let temp = {} as GroupOption;
            if (localSearchQuery.current !== searchQuery) {
              localSearchQuery.current = searchQuery;
              z = [...(transToGroupOption(res.data || [], groupBy)?.[''] || [])];
            } else {
              temp = { ...prev };
              z = [...(prev?.[''] || []), ...(transToGroupOption(res.data || [], groupBy)?.[''] || [])];
            }
            temp[''] = z;
            return temp;
          });
          setIsSearchLoading?.(false);
          return res;
        }}
        styleClasses={{ container: 'h-full pb-4' }}
      >
        {children}
      </InfiniteScrollProvider>
    );
  }
  return <>{children}</>;
};

export default APIPagination;
