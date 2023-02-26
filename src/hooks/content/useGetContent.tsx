import React, { useEffect, useState } from "react"
import { LanguageType } from "@services/constants/_index"
import { graphql, useStaticQuery } from "gatsby"

const useGetContent = () => {
  const [strapiData, setStrapiData] = useState<LanguageType[]>([])

  useEffect(() => {
    const strapiData = useStaticQuery(graphql`
      query Content {
        allStrapiIzyAsset {
          nodes {
            key
            locale
            value {
              data {
                value
              }
            }
            localizations {
              data {
                attributes {
                  value
                  key
                  locale
                }
              }
            }
            id
          }
        }
        allStrapiIzyPage {
          nodes {
            uri
            title
            name
            locale
            izy_assets {
              key
              id
              value {
                data {
                  value
                }
              }
              locale
              localizations {
                data {
                  attributes {
                    value
                    locale
                    key
                  }
                }
              }
            }
            id
          }
        }
      }
    `)

    setStrapiData(strapiData)
  }, [])

  return strapiData
}

export default useGetContent
