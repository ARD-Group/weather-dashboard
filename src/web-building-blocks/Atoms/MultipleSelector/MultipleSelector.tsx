import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { X } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { PopoverAnchor } from "@radix-ui/react-popover";

import { cn } from "../../shadcnUI/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../../shadcnUI/components/ui/command";
import { Popover, PopoverContent } from "../../shadcnUI/components/ui/popover";

import { useDebounce } from "./useDebounce";
import { transToGroupOption, removePickedOption } from "./utils";
import { getS3Path } from "../../utils";

import ShowIf from "../ShowIf/ShowIf";

import EmptyItem from "./EmptyItem";
import APIPagination, { ApiPaginationAndSearch } from "./APIPagination";
import MultipleSelectionInput from "./MultipleSelectionInput";
import CreatableItem from "./CreatableItem";

import { Option, GroupOption } from "./types";

type FEPaginationAndSearch = {
  onSearchSync?: (value: string) => Option[];
  onSearch?: never;
  fetchNextPage?: never;
};

type AddButtonProps =
  | {
      creatable: true;
      onAddClick?: (val: string) => void;
      isAddLoading?: boolean;
    }
  | { creatable?: false; onAddClick?: never; isAddLoading?: never };

type MaxSelectedProps =
  | {
      maxSelected: number;
      onMaxSelected?: (maxLimit: number) => void;
    }
  | { maxSelected?: number; onMaxSelected?: never };

type SingleSelectionProps = {
  mode?: "single";
  value?: Option;
  onChange?: (option: Option | Option[]) => void;
};

type MultipleSelectionProps = {
  mode?: "multiple";
  value?: Option[];
  onChange?: (options: Option[] | Option) => void;
};

type SelectionProps = SingleSelectionProps | MultipleSelectionProps;

export type MultipleSelectorProps<T> = (
  | FEPaginationAndSearch
  | ApiPaginationAndSearch
) &
  AddButtonProps &
  MaxSelectedProps &
  SelectionProps & {
    options?: Option[];
    placeholder?: string;
    inputPlaceholder?: string;
    loadingIndicator?: React.ReactNode;
    emptyIndicator?: React.ReactNode;
    delay?: number;
    triggerSearchOnFocus?: boolean;
    hidePlaceholderWhenSelected?: boolean;
    disabled?: boolean;
    groupBy?: string;
    className?: string;
    enableFetchOnFocus?: boolean;
    commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
    inputProps?: Omit<
      React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
      "value" | "placeholder" | "disabled"
    >;
    hideClearAllButton?: boolean;
    dataTestId?: string;
    renderCustomLabel?: (option: Option) => React.ReactNode;
    renderCustomOption?: (option: Option) => React.ReactNode;
    renderCustomValue?: (option: Option) => React.ReactNode;
    onRemove?: (value: Option) => boolean;
    confirmedRemove?: boolean;
    resetAfterConfirmation?: () => void;
    onRemoveAll?: (options: Option[]) => boolean;
    keywords?: Array<keyof T>;
    styleClasses?: {
      searchInputProps?: string;
      badgeClassName?: string;
    };
    readOnly?: boolean;
    icon?: React.ReactNode;
    mainIcon?: React.ReactNode;
  };

export interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}
let onConfirmRemove: () => void = () => {};
let onConfirmRemoveAll: () => void = () => {};

const getInputPlaceholder = (
  searchCreatePlaceholder: string | undefined,
  hasSearch: boolean,
  creatable: boolean
) => {
  const addPlaceholder = creatable ? "Add" : "";
  const searchPlaceholder = hasSearch ? "Search..." : "...";
  const defaultPlaceholder = `${addPlaceholder}${hasSearch && creatable ? " OR " : ""}${searchPlaceholder}`;

  return searchCreatePlaceholder ? searchCreatePlaceholder : defaultPlaceholder;
};

const MultipleSelector = forwardRef(
  <T extends Option>(
    {
      value = [],
      keywords = ["label"] as Array<keyof T>,
      onChange: handleChange,
      placeholder: searchCreatePlaceholder,
      inputPlaceholder = "Select...",
      options: optionsProp = [],
      delay = 700,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      mode: modeProps = "multiple",
      maxSelected: maxSelectedProps = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      enableFetchOnFocus = false,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      onAddClick,
      isAddLoading = false,
      inputProps,
      hideClearAllButton = false,
      dataTestId = "multiple-selector",
      renderCustomLabel,
      renderCustomOption,
      renderCustomValue,
      onRemove,
      confirmedRemove = false,
      resetAfterConfirmation,
      onRemoveAll,
      styleClasses,
      readOnly = false,
      icon,
      mainIcon,
      ...props
    }: MultipleSelectorProps<T>,
    ref: React.Ref<MultipleSelectorRef>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const mode =
      maxSelectedProps === 1 || modeProps === "single" ? "single" : "multiple";
    const maxSelected = mode === "single" ? 1 : maxSelectedProps;

    const [open, setOpen] = useState(false);
    // const [_onScrollbar, setOnScrollbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<Option[]>(
      Array.isArray(value) ? value : [value]
    );
    const [options, setOptions] = useState<GroupOption>(
      transToGroupOption(optionsProp || [], groupBy)
    );
    const [inputValue, setInputValue] = useState("");
    const [prevInputValue, setPrevInputValue] = useState<string>();
    const debouncedSearchTerm = useDebounce(inputValue, delay);

    useEffect(() => {
      if (Array.isArray(value) ? !value.length : !value) {
        setSelected([]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value.length]);

    useEffect(
      () => {
        if (Array.isArray(value)) {
          setSelected(value);
        } else {
          setSelected([value]);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.stringify(value)]
    );

    const onChange = useCallback((options: Option[]) => {
      const formattedOptions = mode === "single" ? options?.[0] : options;

      handleChange?.(formattedOptions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUnselect = useCallback(
      (option: Option) => {
        const newOptions = selected?.filter((s) => s.value !== option.value);
        onChange?.(newOptions);
        setSelected(newOptions);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onChange, selected]
    );

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...(selected || [])],
        input: inputRef.current as HTMLInputElement,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected([]),
      }),
      [selected]
    );

    const resetToInitial = useCallback(() => {
      setPrevInputValue(undefined);
      setInputValue("");
      setOptions(transToGroupOption(optionsProp || [], groupBy));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        const isOutsideDropdown =
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node);
        const isOutsideInput =
          inputRef.current && !inputRef.current.contains(event.target as Node);

        if (isOutsideDropdown && isOutsideInput) {
          setOpen(false);
          resetToInitial();
          inputRef.current?.blur();
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [optionsProp, groupBy]
    );

    const onChipRemove = useCallback(
      (option: Option) => {
        onConfirmRemove = () => {
          handleUnselect(option);
          resetAfterConfirmation?.();
        };
        const shouldRemove = onRemove?.(option) ?? true;
        if (shouldRemove) {
          handleUnselect(option);
        }
      },
      [onRemove, handleUnselect, resetAfterConfirmation]
    );

    const handleRemoveAll = useCallback(
      (options: Option[]) => {
        onConfirmRemoveAll = () => {
          setSelected([]);
          onChange?.([]);
          resetAfterConfirmation?.();
        };
        const shouldRemove = onRemoveAll?.(options) ?? true;
        if (shouldRemove) {
          setSelected([]);
          onChange?.([]);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onRemoveAll, resetAfterConfirmation]
    );

    React.useEffect(() => {
      if (confirmedRemove) {
        onConfirmRemoveAll();
        onConfirmRemove();
      }
      onConfirmRemoveAll = () => {};
      onConfirmRemove = () => {};
    }, [confirmedRemove]);

    useEffect(() => {
      if (!open) return;

      document.addEventListener("mousedown", handleClickOutside);

      if (!onSearchSync && !onSearch) return;
      if (debouncedSearchTerm === prevInputValue) return;
      if (
        Object.keys(options)?.length !== 0 &&
        debouncedSearchTerm === "" &&
        prevInputValue === undefined &&
        !enableFetchOnFocus
      )
        return;

      const performSearch = async () => {
        setIsLoading(true);
        try {
          const searchResults = onSearchSync
            ? onSearchSync(debouncedSearchTerm)
            : await onSearch?.(debouncedSearchTerm);

          if (searchResults) {
            setOptions(transToGroupOption(searchResults, groupBy));
          }
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setPrevInputValue(debouncedSearchTerm);
          setIsLoading(false);
        }
      };

      performSearch();

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      debouncedSearchTerm,
      open,
      onSearchSync,
      onSearch,
      groupBy,
      handleClickOutside,
    ]);

    useEffect(() => {
      if (!optionsProp || onSearch) {
        return;
      }
      const newOption = transToGroupOption(optionsProp || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsProp, groupBy]);

    const hasSearch = !!onSearchSync || !!onSearch || !!props.fetchNextPage;

    const selectables = useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected]
    );

    const commandFilter = useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }

      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }
      return undefined;
    }, [creatable, commandProps?.filter]);

    return (
      <Popover open={open}>
        <Command
          ref={dropdownRef}
          {...commandProps}
          className={cn(
            "h-auto overflow-visible bg-transparent",
            {
              "bg-background": disabled || readOnly,
            },

            commandProps?.className
          )}
          shouldFilter={false}
          filter={commandFilter()}
          data-testid={`${dataTestId}-root`}
        >
          <PopoverAnchor>
            <div
              className={cn(
                "border-input ring-offset-background focus-within:ring-ring min-h-10 rounded-md border text-sm focus-within:ring-2 focus-within:ring-offset-2",
                {
                  "px-3 py-2": selected.length !== 0,
                  "cursor-text":
                    !disabled && selected.length !== 0 && !readOnly,
                },
                className
              )}
              onClick={() => {
                if (disabled || readOnly) return;
                inputRef?.current?.focus();
              }}
              data-testid={`${dataTestId}-input`}
            >
              <div
                className="relative flex flex-wrap gap-1 pe-4 w-full"
                data-testid={`${dataTestId}-selected-container`}
              >
                {mode === "multiple" ? (
                  <MultipleSelectionInput
                    selected={selected}
                    badgeClassName={styleClasses?.badgeClassName}
                    dataTestId={dataTestId}
                    disabled={disabled || readOnly}
                    onChipRemove={onChipRemove}
                    renderCustomLabel={renderCustomLabel}
                  />
                ) : (
                  <div>
                    {renderCustomValue?.(selected?.[0]) ??
                      selected?.[0]?.label ??
                      ""}
                  </div>
                )}
                <div className="flex items-center gap-2 flex-1">
                  {mainIcon && <div className="flex-shrink-0">{mainIcon}</div>}
                  <CommandPrimitive.Input
                    ref={inputRef}
                    value={""}
                    readOnly
                    disabled={disabled || readOnly}
                    onFocus={(event) => {
                      setOpen(true);
                      triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                      inputProps?.onFocus?.(event);
                    }}
                    placeholder={
                      (mode === "single" && selected?.length > 0) ||
                      disabled ||
                      readOnly
                        ? ""
                        : inputPlaceholder
                    }
                    className={cn(
                      "placeholder:text-muted-foreground w-full flex-1 bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50",
                      {
                        "px-3 py-2": selected.length === 0,
                        "ml-1": selected.length !== 0,
                      },
                      inputProps?.className,
                      readOnly && "cursor-auto"
                    )}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleRemoveAll(selected);
                  }}
                  className={cn(
                    "absolute end-0 h-6 w-6 p-0",
                    (hideClearAllButton ||
                      disabled ||
                      readOnly ||
                      selected?.length < 1 ||
                      selected?.filter((s) => s?.fixed).length ===
                        selected?.length) &&
                      "hidden"
                  )}
                >
                  <X />
                </button>
              </div>
            </div>
          </PopoverAnchor>
          <div className="relative" data-testid={`${dataTestId}-list`}>
            <ShowIf If={open}>
              <PopoverContent
                noPortal
                side="bottom"
                sideOffset={0}
                align="start"
                className="p-0"
              >
                <CommandList className="bg-popover text-popover-foreground animate-in start-0 top-1 z-10 w-full rounded-md text-search-text border shadow-md outline-none bg-search-bg ">
                  <div className="sticky top-0 z-10 bg-search-bg text-search-text">
                    {(hasSearch || creatable) && (
                      <div className="flex items-center gap-2 border-b p-2 text-search-text">
                        <div>
                          {icon || (
                            <img
                              src={getS3Path("/icons/search-01.svg")}
                              alt="search-icon"
                              className={cn("text-muted-foreground h-5 w-5")}
                            />
                          )}
                        </div>

                        <CommandPrimitive.Input
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          value={inputValue}
                          disabled={disabled}
                          onValueChange={(value) => {
                            if (isLoading) return;
                            setInputValue(value);
                          }}
                          placeholder={
                            hidePlaceholderWhenSelected && selected.length !== 0
                              ? ""
                              : getInputPlaceholder(
                                  searchCreatePlaceholder,
                                  hasSearch,
                                  creatable
                                )
                          }
                          className={cn(
                            "placeholder:text-muted-foreground text-search-text w-full flex-1 bg-search-bg outline-none",
                            styleClasses?.searchInputProps
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <APIPagination
                    fetchNextPage={props.fetchNextPage}
                    groupBy={groupBy}
                    search={debouncedSearchTerm}
                    hasInitialData={optionsProp?.length > 0}
                    setOptions={setOptions}
                    setIsSearchLoading={setIsLoading}
                  >
                    <ShowIf If={isLoading}>
                      <div className="p-2">{loadingIndicator}</div>
                    </ShowIf>
                    <ShowIf If={!isLoading}>
                      <EmptyItem
                        emptyIndicator={emptyIndicator}
                        onSearch={onSearch}
                        creatable={creatable}
                        options={options}
                        dataTestId={dataTestId}
                      >
                        {creatable && (
                          <div
                            className={cn("mt-2 flex justify-start border-t")}
                          >
                            <CreatableItem
                              inputValue={inputValue}
                              selected={selected}
                              setInputValue={setInputValue}
                              setSelected={setSelected}
                              onChange={onChange}
                              setOpen={setOpen}
                              onAddClick={onAddClick}
                              isAddLoading={isAddLoading}
                              dataTestId={dataTestId}
                            />
                          </div>
                        )}
                      </EmptyItem>

                      {Object.entries(selectables)?.map(([key, dropdowns]) => (
                        <CommandGroup
                          key={key}
                          heading={key}
                          className="h-full w-full overflow-auto"
                          data-testid={`${dataTestId}-group-${key}`}
                        >
                          {dropdowns?.map((option) => (
                            <CommandItem
                              keywords={keywords?.map((keyword) =>
                                String(option[keyword])
                              )}
                              key={option.value}
                              value={option.value}
                              disabled={option.disable}
                              data-testid={`${dataTestId}-item-${option.label}`}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                if (
                                  selected.length >= maxSelected &&
                                  mode === "multiple"
                                ) {
                                  onMaxSelected?.(selected.length);
                                  return;
                                }

                                setInputValue("");
                                const newOptions =
                                  mode === "single"
                                    ? [option]
                                    : [...(selected || []), option];
                                setSelected(newOptions);
                                onChange?.(newOptions);
                                if (mode === "single") {
                                  setTimeout(() => {
                                    setOpen(false);
                                    resetToInitial();
                                    inputRef?.current?.blur();
                                  }, 50);
                                }
                              }}
                              className={cn(
                                "cursor-pointer",
                                option.disable &&
                                  "text-muted-foreground cursor-default"
                              )}
                            >
                              {renderCustomOption?.(option) ?? option.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                    </ShowIf>
                  </APIPagination>

                  {creatable && (
                    <CommandGroup className="sticky bottom-0 search-bg">
                      <CommandItem
                        className={cn(
                          "border-t p-0 text-sm hover:bg-transparent"
                        )}
                      >
                        <CreatableItem
                          inputValue={inputValue}
                          selected={selected}
                          setInputValue={setInputValue}
                          setSelected={setSelected}
                          onChange={onChange}
                          onAddClick={onAddClick}
                          setOpen={setOpen}
                          isAddLoading={isAddLoading}
                          dataTestId={dataTestId}
                        />
                      </CommandItem>
                    </CommandGroup>
                  )}
                </CommandList>
              </PopoverContent>
            </ShowIf>
          </div>
        </Command>
      </Popover>
    );
  }
);

MultipleSelector.displayName = "MultipleSelector";
export default MultipleSelector;
