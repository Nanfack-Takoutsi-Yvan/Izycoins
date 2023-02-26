import React, { useEffect, useState } from "react"
import axios from "axios"
import { LanguageType } from "@services/constants/_index"

const useGetLanguages = (url: string) => {
  const [languages, setLanguages] = useState<LanguageType[]>([])
  const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get(`${process.env.GATSBY_STRAPI_API_URL}${url}`)
      .then((res) => {
        setLanguages(res.data)
      })
      .catch((error) => {
        throw new Error(error)
      })
      .finally(() => {
        setLoadingLanguages(false)
      })
  }, [url])

  return { languages, loadingLanguages }
}

export default useGetLanguages
