export const makeHumanReadableName = (key: string) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, function (match) {
      return match.toUpperCase();
    })
    .replace("Fa ", "");
};
