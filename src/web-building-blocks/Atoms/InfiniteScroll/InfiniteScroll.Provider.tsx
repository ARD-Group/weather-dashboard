import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

import InfiniteScroll from './InfiniteScroll';
import { cn } from '../../shadcnUI/lib/utils';

interface InfiniteScrollContextProps<T> {
  items: T[];
}

const InfiniteScrollContext = createContext<InfiniteScrollContextProps<any> | undefined>(undefined);

type InfiniteScrollProviderProps<T> = {
  searchQuery?: string;
  fetchItems: (page: number, searchQuery: string) => Promise<{ data: T[]; hasMore: boolean }>;
  children: React.ReactNode;
  hasInitialData: boolean;
  styleClasses: {
    container?: string;
    loader?: string;
  };
};

export default function InfiniteScrollProvider<T>({
  fetchItems,
  searchQuery = '',
  children,
  hasInitialData,
  styleClasses = {
    container: 'h-[25rem]',
  },
}: InfiniteScrollProviderProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const localSearchQuery = useRef<string>(searchQuery);
  const firstRender = useRef<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMore = React.useCallback(async () => {
    // Cases covered
    // 1. pagination after the initial options
    // 2. pagination without initial options
    // 3. pagination after search
    // 4. search without more pages

    if ((localSearchQuery.current === searchQuery && !hasMore) || isLoading) return;
    if (hasInitialData && page === 0) {
      setPage(1);
      return;
    }
    setIsLoading(true);

    let currentPage = page;
    if (localSearchQuery.current !== searchQuery) {
      currentPage = 0;
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }

    const { data, hasMore: moreAvailable } = await fetchItems(currentPage, searchQuery);
    if (localSearchQuery.current === searchQuery) {
      setItems((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } else {
      localSearchQuery.current = searchQuery;
      setItems(data);
      setPage(1);
    }
    setHasMore(moreAvailable);
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchItems, hasMore, isLoading, page, searchQuery]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <InfiniteScrollContext.Provider value={{ items }}>
      <div
        ref={containerRef}
        className={cn('flex w-full flex-col items-center gap-3 overflow-y-auto py-2', styleClasses?.container)}
      >
        {hasMore && page === 0 && (
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={isLoading}
            next={loadMore}
            threshold={1}
          >
            {hasMore && (
              <div className={cn('h-8 w-8', styleClasses?.loader)}>
                <Loader2 className={cn('my-2 h-full w-full animate-spin py-2')} />
              </div>
            )}
          </InfiniteScroll>
        )}
        {children}

        {hasMore && page > 0 && (
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={isLoading}
            next={loadMore}
            threshold={1}
          >
            <div className={cn('h-8 w-8', styleClasses?.loader)}>
              <Loader2 className={cn('my-2 h-full w-full animate-spin py-2')} />
            </div>
          </InfiniteScroll>
        )}
      </div>
    </InfiniteScrollContext.Provider>
  );
}

InfiniteScrollProvider.displayName = 'InfiniteScrollProvider';

export function useInfiniteScroll<T>() {
  const context = useContext(InfiniteScrollContext);
  if (!context) {
    throw new Error('useInfiniteScroll must be used within an InfiniteScrollProvider');
  }
  return context as InfiniteScrollContextProps<T>;
}
