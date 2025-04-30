import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MultipleSelector, { MultipleSelectorProps } from "./MultipleSelector";
import { Option } from "./types";
import { cn } from "../../shadcnUI/lib/utils";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Astro", value: "astro" },

  { label: "nextjs2", value: "nextjs2" },
  { label: "React2", value: "react2" },
  { label: "Remix2", value: "remix2" },
  { label: "Vite2", value: "vite2" },
  { label: "Nuxt2", value: "nuxt2" },
  { label: "Vue2", value: "vue2" },
  { label: "Svelte2", value: "svelte2" },
  { label: "Angular2", value: "angular2" },
  { label: "Astro2", value: "astro2" },

  { label: "nextjs3", value: "nextjs3" },
  { label: "React3", value: "react3" },
  { label: "Remix3", value: "remix3" },
  { label: "Vite3", value: "vite3" },
  { label: "Nuxt3", value: "nuxt3" },
  { label: "Vue3", value: "vue3" },
  { label: "Svelte3", value: "svelte3" },
  { label: "Angular3", value: "angular3" },
  { label: "Astro3", value: "astro3" },

  { label: "nextjs4", value: "nextjs4" },
  { label: "React4", value: "react4" },
  { label: "Remix4", value: "remix4" },
  { label: "Vite4", value: "vite4" },
  { label: "Nuxt4", value: "nuxt4" },
  { label: "Vue4", value: "vue4" },
  { label: "Svelte4", value: "svelte4" },
  { label: "Angular4", value: "angular4" },
  { label: "Astro4", value: "astro4" },

  { label: "nextjs5", value: "nextjs5" },
  { label: "nextjs6", value: "nextjs6" },
  { label: "nextjs7", value: "nextjs7" },
  { label: "nextjs8", value: "nextjs8" },
  { label: "nextjs9", value: "nextjs9" },
  { label: "nextjs10", value: "nextjs10" },
  { label: "nextjs11", value: "nextjs11" },
  { label: "nextjs12", value: "nextjs12" },
];
const meta: Meta<MultipleSelectorProps<(typeof OPTIONS)[0]>> = {
  title: "Atoms/MultipleSelector",
  component: MultipleSelector,
  decorators: [
    (Story) => (
      <div className={cn("h-[13em] w-[26.25rem] overflow-hidden border p-2")}>
        <Story />
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, quam
        placeat sed accusantium, quis culpa saepe, veniam tempore aut tempora
        nihil illum fuga numquam dolor nemo voluptas rerum animi unde!
      </div>
    ),
  ],
  args: {
    options: OPTIONS,
  },
} satisfies Meta<MultipleSelectorProps<(typeof OPTIONS)[0]>>;

export default meta;
type Story = StoryObj<typeof MultipleSelector>;
export const Default: Story = {};
export const SingleSelection: Story = {
  args: {
    mode: "single",
    // OR
    // maxSelected: 1,
  },
};

export const MultipleSelectionWithValue: Story = {
  args: {
    value: OPTIONS.slice(0, 3),
  },
};

export const SingleSelectionWithValue: Story = {
  args: {
    mode: "single",
    value: OPTIONS[2],
  },
};

export const WithAdd: Story = {
  args: {
    value: OPTIONS.slice(4, 7),
    creatable: true,
    onAddClick: (val: string) => console.log("Add clicked", val),
  },
};

export const WithAddSingle: Story = {
  args: {
    mode: "single",
    options: OPTIONS,
    creatable: true,
    onAddClick: (val: string) => console.log("Add clicked", val),
  },
};

export const WithAddAndEmpty: Story = {
  args: {
    value: OPTIONS.slice(4, 7),
    creatable: true,
    onAddClick: (val: string) => console.log("Add clicked", val),
    emptyIndicator: "No options found",
  },
};

export const WithDisabled: Story = {
  args: {
    value: OPTIONS.slice(4, 7),
    disabled: true,
  },
};

export const Controlled: Story = {
  args: {
    value: OPTIONS.slice(1, 4),
    onChange: (value) => console.log("MultipleSelector clicked", value),
  },
};

export const SingleSelectionControlled: Story = {
  args: {
    mode: "single",
    value: OPTIONS[1],
    onChange: (value) => console.log("MultipleSelector clicked", value),
  },
};

export const WithCustomEmptyIndicator: Story = {
  args: {
    options: [],
    emptyIndicator: "No options available",
  },
};

export const WithCreateOption: Story = {
  args: {
    options: [],
    creatable: true,
  },
};

export const WithHideClearAllButton: Story = {
  args: {
    value: OPTIONS.slice(0, 3),
    hideClearAllButton: true,
  },
};

export const WithCustomOptions: Story = {
  args: {
    options: OPTIONS,
    renderCustomOption: (option) => (
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">custom</span>
        <span>{option.label}</span>
      </div>
    ),
  },
};

export const WithCustomLabel: Story = {
  args: {
    value: OPTIONS.slice(0, 3),
    options: OPTIONS,
    renderCustomLabel: (option) => (
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">custom</span>
        <span>{option.label}</span>
      </div>
    ),
  },
};

export const WithSyncSearch: Story = {
  args: {
    options: OPTIONS,
    onSearchSync: (search) => {
      return OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};

export const WithAsyncSearch: Story = {
  args: {
    options: OPTIONS,
    onSearch: async (search) => {
      await new Promise((r) => setTimeout(r, 1000));
      return OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};

export const WithAsyncSearchAdd: Story = {
  args: {
    options: OPTIONS,
    onSearch: async (search) => {
      await new Promise((r) => setTimeout(r, 1000));
      return OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
    creatable: true,
    onAddClick: (val: string) => console.log("Add clicked", val),
  },
};

export const WithAsyncSearchAndFetchOnFocus: Story = {
  args: {
    options: [],
    enableFetchOnFocus: true,
    onSearch: async (search) => {
      await new Promise((r) => setTimeout(r, 1000));
      return OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};

export const WithAsyncSearchAndAPIPaginationAndDefaultOptions: Story = {
  args: {
    options: OPTIONS.slice(0, 10),
    fetchNextPage: async (page, searchQuery) => {
      await new Promise((r) => setTimeout(r, 2000));
      const filteredOptions = OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const upTillThisPage = filteredOptions.slice(0, page * 10 + 10).length;
      const results = filteredOptions.slice(page * 10, page * 10 + 10);
      return {
        data: results,
        hasMore: upTillThisPage < filteredOptions.length,
      };
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};

export const WithAsyncSearchAndAPIPaginationAndFetchOnFocus: Story = {
  args: {
    options: [],
    enableFetchOnFocus: true,
    fetchNextPage: async (page, searchQuery) => {
      await new Promise((r) => setTimeout(r, 2000));
      const filteredOptions = OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const upTillThisPage = filteredOptions.slice(0, page * 10 + 10).length;
      const results = filteredOptions.slice(page * 10, page * 10 + 10);
      return {
        data: results,
        hasMore: upTillThisPage < filteredOptions.length,
      };
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};

export const WithAsyncSearchAndAPIPagination: Story = {
  args: {
    options: [],
    fetchNextPage: async (page, searchQuery) => {
      await new Promise((r) => setTimeout(r, 2000));
      const filteredOptions = OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const upTillThisPage = filteredOptions.slice(0, page * 10 + 10).length;
      const results = filteredOptions.slice(page * 10, page * 10 + 10);
      return {
        data: results,
        hasMore: upTillThisPage < filteredOptions.length,
      };
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};

export const WithAsyncSearchAndAPIPaginationAndAdd: Story = {
  args: {
    options: [],
    creatable: true,
    fetchNextPage: async (page, searchQuery) => {
      await new Promise((r) => setTimeout(r, 2000));
      const filteredOptions = OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const upTillThisPage = filteredOptions.slice(0, page * 10 + 10).length;
      const results = filteredOptions.slice(page * 10, page * 10 + 10);
      return {
        data: results,
        hasMore: upTillThisPage < filteredOptions.length,
      };
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};
export const SingleWithAsyncSearchAndAPIPaginationAndAdd: Story = {
  args: {
    mode: "single",
    options: [],
    creatable: true,
    onAddClick: (val: string) => console.log("Add clicked", val),
    onChange: (value) => console.log("MultipleSelector clicked", value),
    fetchNextPage: async (page, searchQuery) => {
      console.log("fetchNextPage", page, searchQuery);
      await new Promise((r) => setTimeout(r, 2000));
      const filteredOptions = OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const upTillThisPage = filteredOptions.slice(0, page * 10 + 10).length;
      const results = filteredOptions.slice(page * 10, page * 10 + 10);
      return {
        data: results,
        hasMore: upTillThisPage < filteredOptions.length,
      };
    },
    loadingIndicator: "Loading...",
    emptyIndicator: "No results found",
  },
};

export const WithCustomStyleBadge: Story = {
  args: {
    value: OPTIONS.slice(0, 3),
    styleClasses: {
      badgeClassName:
        "bg-neutral1 text-neutral9 hover:bg-neutral2 cursor-pointer",
    },
  },
};

export const ResetValueMulti: Story = {
  render: () => {
    const [value, setValue] = useState<Option[] | undefined>(
      OPTIONS.slice(0, 3)
    );
    return (
      <>
        <button onClick={() => setValue(undefined)}> reset</button>
        <MultipleSelector
          value={value}
          options={OPTIONS}
          onChange={(val) => setValue(val as Option[])}
        />
      </>
    );
  },
};
export const ResetValue: Story = {
  render: () => {
    const [value, setValue] = useState<Option | undefined>(OPTIONS[0]);
    return (
      <>
        <button onClick={() => setValue(undefined)}> reset</button>
        <MultipleSelector
          mode="single"
          value={value}
          options={OPTIONS}
          onChange={(val) => setValue(val as Option)}
        />
      </>
    );
  },
};

export const DelayedMultipleValue: Story = {
  render: () => {
    const [value, setValue] = useState<Option[] | undefined>();

    useEffect(() => {
      setTimeout(() => {
        setValue(OPTIONS.slice(0, 3));
      }, 2000);
    }, []);

    return (
      <>
        <MultipleSelector
          value={value}
          options={OPTIONS}
          onChange={(val) => setValue(val as Option[])}
        />
      </>
    );
  },
};

export const DelayedSingleValue: Story = {
  render: () => {
    const [value, setValue] = useState<Option | undefined>();

    useEffect(() => {
      setTimeout(() => {
        setValue(OPTIONS[0]);
      }, 2000);
    }, []);

    return (
      <>
        <MultipleSelector
          mode="single"
          value={value}
          options={OPTIONS}
          onChange={(val) => setValue(val as Option)}
        />
      </>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    // disabled: true,
    readOnly: true,
    value: OPTIONS.slice(0, 3),
  },
};
