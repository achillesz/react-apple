export const lanuageSet = ["zh-CN", "en-US", "zh-TW", "fr-FR"] as const;

export type CultureCode = (typeof lanuageSet)[number];

export const setCulture = (cultureCode: CultureCode) => ({
  type: "SET_CULTURE" as const,
  payload: {
    currentLanguage: cultureCode,
  },
});

type CultureAction = ReturnType<typeof setCulture>;

interface I18nState {
  currentLanguage: CultureCode;
}

export default (
  state = {
    currentLanguage: "zh-CN",
  } as I18nState,
  action: CultureAction,
) => {
  switch (action.type) {
    case "SET_CULTURE":
      return {
        ...state,
        currentLanguage: action.payload.currentLanguage,
      };
    default:
      return state;
  }
};
