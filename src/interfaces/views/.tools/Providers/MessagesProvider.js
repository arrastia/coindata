import React from 'react';

import { Messages } from 'config/languages';

import { MessagesContext } from 'interfaces/views/.tools/Contexts/MessagesContext';

export const MessagesProvider = ({ children }) => (
  <MessagesContext.Provider value={{ ...Messages }}>{children}</MessagesContext.Provider>
);
