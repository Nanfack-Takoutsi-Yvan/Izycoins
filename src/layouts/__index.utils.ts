import React from "react"
import { LanguageEnum, LanguageType } from "@services/constants/_index"
import { PageDataType } from "@services/typings/shared"
import config from "@utils/config"

export type AppContextProps = {
  authUser: boolean
  pathName: string
  localLanguage: string | undefined
  languages: LanguageType[]
  pageData: PageDataType
  setLanguage: (language: string) => void
  setAuthUser: (user: boolean) => void
}

export const setAuthUser = (user?: boolean) => {
  if (user) {
    return true
  }

  return false
}

export const getLanguage = (): string => {
  const lang =
    localStorage.getItem(config.localstorage.languageKey) || LanguageEnum.EN
  return lang
}

export const setLanguage = (
  languageCode: string,
  setLanguageCode: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  if (languageCode) {
    localStorage.setItem(config.localstorage.languageKey, languageCode)
    setLanguageCode(languageCode)
  } else {
    localStorage.removeItem(config.localstorage.languageKey)
    setLanguageCode(LanguageEnum.EN)
  }
}

type ALL_STRAPI_IZY_ASSETS = {
  nodes: {
    id: string
    key: string
    locale: string
    value: {
      data: {
        value: string
      }
    }
  }[]
}

type ALL_STRAPI_IZY_PAGES = {
  nodes: {
    id: string
    uri: string
    name: string
    title: string
    locale: string
    description: string
    izy_assets: ALL_STRAPI_IZY_ASSETS["nodes"]
  }[]
}

export type STRAPI_DATA = {
  allStrapiIzyAsset: ALL_STRAPI_IZY_ASSETS
  allStrapiIzyPage: ALL_STRAPI_IZY_PAGES
}

type ASSET_ARRAY = {
  value: string
  key: string
}

const assetsWithLocalesToDict = (
  data: ALL_STRAPI_IZY_ASSETS["nodes"]
): { [key: string]: ASSET_ARRAY } => {
  const res = {}
  data.forEach((node) => {
    if (node.id) {
      if (!res[node.id]) {
        res[node.id] = {
          value: node.value.data.value,
          key: node.key,
        }
      }
    }
  }, [])
  return res
}

const pageWithLocalesTodDict = (
  data: ALL_STRAPI_IZY_PAGES["nodes"]
): { [key: string]: { [key: string]: PageDataType } } => {
  const pages = {}
  data.forEach((pageNode) => {
    if (!pages[pageNode.name]) {
      pages[pageNode.name] = {}
    }

    pages[pageNode.name][pageNode.locale] = {
      id: pageNode.id,
      uri: pageNode.uri,
      name: pageNode.name,
      title: pageNode.title,
      description: pageNode.description,
      assets: pageNode.izy_assets.map((assets) => assets.id),
    }
  })

  return pages
}

export const transformStrapiData = (
  data: STRAPI_DATA
): { [key: string]: { [key: string]: PageDataType } } => {
  const assets = assetsWithLocalesToDict(data.allStrapiIzyAsset.nodes || [])
  const pages = pageWithLocalesTodDict(data.allStrapiIzyPage.nodes)

  Object.keys(pages).forEach((page) => {
    Object.keys(pages[page]).forEach((lang) => {
      const pageAssets = {}
      const tempPageAssets = pages[page][lang]?.assets as unknown as string[]
      tempPageAssets?.forEach((key) => {
        pageAssets[assets[key]?.key] = assets[key]?.value
      })
      pages[page][lang].assets = pageAssets
    })
  })

  return pages
}
