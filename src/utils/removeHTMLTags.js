export const removeHTMLTags = (str) => {
  if (str === null || str === "") return false;
  str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
};
