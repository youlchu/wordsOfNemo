import * as Updates from "expo-updates";
import i18n from "i18next";
import moment from "moment";
import { initReactI18next, useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

require("moment/locale/ar.js");
require("moment/locale/tr.js");

const I18N_NAME_SPACE = "translation";

type LanguageModel = {
  lang: string;
  isRTL: boolean;
};

var currentLang: LanguageModel = {
  lang: "tr",
  isRTL: false,
};

export const initLocalization = async () => {
  const storedLang = await AsyncStorage.getItem("APP_LANGUAGE");
  const lang = storedLang || currentLang.lang;

  i18n.use(initReactI18next).init({
    resources: {
      tr: {
        translation: require("./locales/tr.json")
      },
      en: {
        translation: require("./locales/en.json")
      }
    },
    lng: lang,
    fallbackLng: "tr",
    ns: I18N_NAME_SPACE,
    interpolation: {
      escapeValue: false,
    },
  });

  moment.locale(lang);
  I18nManager.allowRTL(currentLang.isRTL);
  I18nManager.forceRTL(currentLang.isRTL);
};

export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  return {
    getString: (key: string, options?: any): string =>
      t(key, options) as string,
    changeLanguage: (lang: LanguageModel) => {
      AsyncStorage.setItem("APP_LANGUAGE", lang.lang).then(() => {
        moment.locale(lang.lang);
        i18n.changeLanguage(lang.lang);
        if (currentLang && currentLang.isRTL !== lang.isRTL) {
          I18nManager.allowRTL(lang.isRTL);
          I18nManager.forceRTL(lang.isRTL);
          Updates.reloadAsync();
        }
      });
    },
    currentLanguage: () => i18n.language,
  };
};
