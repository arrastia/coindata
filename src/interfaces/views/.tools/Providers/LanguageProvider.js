import React, { useReducer } from 'react';

import { LanguageContext } from 'interfaces/views/.tools/Contexts/LanguageContext';

import { languageReducer } from 'interfaces/views/.tools/Reducers/languageReducer';

export const LanguageProvider = ({ children }) => {
  const [languageState, languageDispatch] = useReducer(languageReducer, 'en');

  return (
    <LanguageContext.Provider
      value={{
        selected: languageState,
        onChangeLang: ({ type, newLang }) => {
          languageDispatch({ type, payload: newLang });
        }
      }}>
      {children}
    </LanguageContext.Provider>
  );
};
