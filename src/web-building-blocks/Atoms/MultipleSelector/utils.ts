import { Option, GroupOption } from './types';

export const transToGroupOption = (options: Option[], groupBy?: string): GroupOption => {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      '': options,
    };
  }

  const groupOption: GroupOption = {};
  options?.forEach((option) => {
    const key = (option[groupBy] as string) || '';
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
};

export const removePickedOption = (groupOption: GroupOption, picked: Option[]): GroupOption => {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value?.filter((val) => !picked?.find((p) => p?.value === val?.value));
  }
  return cloneOption;
};

export const isOptionsExist = (groupOption: GroupOption, targetOption: Option[]): boolean => {
  for (const [, value] of Object.entries(groupOption)) {
    if (value?.some((option) => targetOption?.find((p) => p?.value === option?.value))) {
      return true;
    }
  }
  return false;
};
