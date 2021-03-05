export const SORT_TYPE = {
  ASC: "asc",
  DESC: "desc",
};

export const SORT_BY = {
  EMAIL: "email",
  DATE: "createdAt",
};

export const compare = (array, sortBy, sortType) => {
  return array.sort((a, b) => {
    if (typeof a[sortBy] === "number") {
      return sortType === SORT_TYPE.DESC
        ? b[sortBy] - a[sortBy]
        : a[sortBy] - b[sortBy];
    } else if (typeof a[sortBy] === "string") {
      return sortType === SORT_TYPE.DESC
        ? b[sortBy].localeCompare(a[sortBy])
        : a[sortBy].localeCompare(b[sortBy]);
    }

    return 0;
  });
};
