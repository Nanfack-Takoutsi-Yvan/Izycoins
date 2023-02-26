import React, { FC, createContext, useEffect, useState } from "react"
import { PageProps, graphql, useStaticQuery } from "gatsby"
import { Router } from "@reach/router"
import LandingPage from "./landingPage"
import PrivateRoute from "@components/router/privateRoute"
import Default from "@pages/index"
import {
  AppContextProps,
  STRAPI_DATA,
  getLanguage,
  setAuthUser,
  setLanguage as setLang,
  transformStrapiData,
} from "./__index.utils"
import { PageDataType } from "@services/typings/shared"
import { LanguageEnum, LanguageType } from "@services/constants/_index"
import customHooks from "@hooks/index"
import { pathToPageName } from "@utils/methods"
import "./index.css"
import { ThemeProvider } from "@emotion/react"
import Theme from "@utils/theme"

export const AppStateContext = createContext<AppContextProps>({
  pageData: {} as PageDataType,
  authUser: false,
  localLanguage: LanguageEnum.EN,
  setLanguage: (language: string) => null,
  setAuthUser: (user: boolean) => null,
  pathName: "",
  languages: [] as LanguageType[],
})

const DynamicLayout: FC<PageProps> = ({ location }) => {
  const [localLanguage, setLocalLanguage] = useState<string>()
  const [languages, setLanguages] = useState<LanguageType[]>([])
  const [authUser, setLocalAuthUser] = useState<boolean>(false)
  const { languages: strapiLanguages } =
    customHooks.useGetLanguages("api/i18n/locales")
  const pathName = location.pathname

  const setLanguage = (language: string) => {
    setLang(language, setLocalLanguage)
  }

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
          description
        }
      }
    }
  `) as STRAPI_DATA

  const allTexts =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    transformStrapiData(strapiData)[pathToPageName(pathName)][localLanguage!]

  useEffect(() => {
    setLanguages(strapiLanguages)
  }, [strapiLanguages])

  useEffect(() => {
    setLanguage(getLanguage())
  }, [])

  return (
    <AppStateContext.Provider
      value={{
        pathName,
        pageData: allTexts,
        authUser,
        localLanguage,
        languages,
        setLanguage,
        setAuthUser,
      }}
    >
      <ThemeProvider theme={Theme}>
        <Router basepath="/">
          <LandingPage path="/" />
          <PrivateRoute
            path="/dasboard"
            component={Default}
            location={location}
          />
        </Router>
      </ThemeProvider>
    </AppStateContext.Provider>
  )
}

export default DynamicLayout
