export const fetchLinkData = async (url) => {
  const response = await fetch(process.env.REACT_APP_PREVIEW + url);
  if (response.status >= 400 && response.status < 600)
    throw new Error("Bad response from server");
  return response.json();
};
