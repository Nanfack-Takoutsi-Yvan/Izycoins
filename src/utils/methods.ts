export const pathToPageName = (path: string): string => {
  const pathLength = path.length
  let pathName = ""

  if (pathLength && path == "/") {
    pathName = path
  }

  return (
    {
      "/": "home",
    }[pathName] || "home"
  )
}
