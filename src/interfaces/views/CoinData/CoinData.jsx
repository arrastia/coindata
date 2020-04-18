import React, { useContext, useEffect } from 'react';

import logo from 'logo.svg';

import styles from './CoinData.module.scss';

import { CoinService } from 'core/services/Coin';

import { LanguageContext } from 'interfaces/views/.tools/Contexts/LanguageContext';
import { MessagesContext } from 'interfaces/views/.tools/Contexts/MessagesContext';

export const CoinData = () => {
  const language = useContext(LanguageContext);
  const messages = useContext(MessagesContext);

  useEffect(() => {
    onLoadCoins();
  }, []);

  const onLoadCoins = async () => {
    try {
      const coins = await CoinService.all();
      console.log('coins', coins);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className={styles.link} href="https://arrastia.me" target="_blank" rel="noopener noreferrer">
          {messages[language.selected]['title']}
        </a>
      </header>
    </div>
  );
};
