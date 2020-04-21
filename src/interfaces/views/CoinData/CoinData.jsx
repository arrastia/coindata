import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from 'logo.svg';
import { FiActivity } from 'react-icons/fi';

import styles from './CoinData.module.scss';

import { getURL } from 'routes/.tools/Utils/getURL';
import { routes } from 'routes/.tools/Utils/routes';

import { Card } from 'interfaces/views/.components/Card';
import { Button } from 'interfaces/views/.components/Button';
import { Dropdown } from 'interfaces/views/.components/Dropdown';
import { InputText } from 'interfaces/views/.components/InputText';
import { DataTable } from 'interfaces/views/.components/DataTable';
import { Spinner } from 'interfaces/views/.components/Spinner';

import { CoinService } from 'core/services/Coin';

import { LanguageContext } from 'interfaces/views/.tools/Contexts/LanguageContext';
import { MessagesContext } from 'interfaces/views/.tools/Contexts/MessagesContext';

export const CoinData = () => {
  const language = useContext(LanguageContext);
  const messages = useContext(MessagesContext);

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    onLoadCoins();
    onLoadList();
    setTimeout(() => {
      onQuitSpinner();
    }, 2000);
  }, []);

  const onLoadCoins = async () => {
    try {
      const coins = await CoinService.all();
      console.log('coins', coins);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onLoadList = async () => {
    try {
      const list = await CoinService.list();
      console.log('list', list);
    } catch (error) {}
  };

  const onQuitSpinner = () => setSpinner(false);

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  if (spinner) return <Spinner />;

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <Link to={getURL(routes.COIN)}>
          <Button label={'activity'}>
            <FiActivity />
          </Button>
        </Link>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className={styles.link} href="https://arrastia.me" target="_blank" rel="noopener noreferrer">
          {messages[language.selected]['title']}
        </a>
        <Card checked={{ id: 777 }} />
      </header>
      <div className={styles.rest}>
        <div>
          <InputText disabled />

          <Dropdown optionLabel="name" options={cities} placeholder="Select a City" />
          <span className="p-float-label">
            <InputText id="in" />
            <label htmlFor="in">Username</label>
          </span>
        </div>
      </div>
    </div>
  );
};
