export const parseUsers = (usersString: string) => {
  return usersString
    .split(/\s/)
    .filter((s) => !!s)
    .map((s) => s.trim());
};

export const parseInterval = (interval: string) => {
  if (!/[0-9][w]/.test(interval)) {
    throw new Error(`${interval} is not a valid interval, use format 1w, 2w, 3w`);
  }

  return interval;
};
