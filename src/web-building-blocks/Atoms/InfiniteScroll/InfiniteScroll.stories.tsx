import { Meta, StoryObj } from "@storybook/react";
import InfiniteScrollProvider, {
  useInfiniteScroll,
} from "./InfiniteScroll.Provider";

interface Item {
  id: number;
  name: string;
}

const mockFetchItems = async (
  page: number
): Promise<{ data: Item[]; hasMore: boolean }> => {
  const data = Array.from({ length: 10 }, (_, index) => ({
    id: page * 10 + index,
    name: `Item ${page * 10 + index + 1}`,
  }));
  const hasMore = page < 5;
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data, hasMore }), 1500)
  );
};

const ItemList = () => {
  const { items } = useInfiniteScroll<Item>();
  return (
    <ul className="flex w-[350px] flex-col gap-4 px-4">
      {items.map((item) => (
        <li
          className="flex h-9 w-full items-center justify-center rounded-md border border-gray-300 bg-white p-5"
          key={item.id}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

const meta: Meta = {
  title: "Atoms/InfiniteScroll",
  component: InfiniteScrollProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <InfiniteScrollProvider
      hasInitialData={false}
      fetchItems={mockFetchItems}
      styleClasses={{ container: "h-[600px] bg-neutral1 shadow-md border" }}
    >
      <ItemList />
    </InfiniteScrollProvider>
  ),
};
