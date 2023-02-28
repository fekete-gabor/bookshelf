export const removeHTMLTags = (str) => {
  if (str === null || str === "" || str === undefined) return false;
  str = str?.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
};
