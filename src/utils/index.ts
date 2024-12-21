export const removeSlashUrl = (url: string): string => {
  let newURL = url

  if (url[url.length - 1] === '/') {
    newURL = url.substring(0, url.length - 1)
  }

  return newURL
}
