/**
 * replace _ with space
 * capitalize first letter for each word
 * @param {string} str The string you want to capitalize.
 * @return {string} The result.
 */
export const capitalize = (str) => {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * remove the last occurence of /word
 * @param {string} str The string you want to process.
 * @return {string} The result.
 */
export const removeLastSlash = (str) => {
  return str.replace(/\/[^\/]*$/, '');
};
