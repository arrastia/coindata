import React, { useContext } from 'react';

import { FiExternalLink } from 'react-icons/fi';

import styles from './Card.module.scss';

import { LanguageContext } from 'interfaces/views/.tools/Contexts/LanguageContext';
import { MessagesContext } from 'interfaces/views/.tools/Contexts/MessagesContext';

export const Card = ({ checked, date, icon, id, obligation, onCheck, subtitle, title }) => {
  const language = useContext(LanguageContext);
  const messages = useContext(MessagesContext);

  return (
    <div
      className={`${styles.card} ${checked.id === id ? styles.checked : undefined}`}
      onClick={() => onCheck(obligation)}>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={`${styles.link}`}>
        <FiExternalLink
          className={styles.linkIcon}
          onMouseDown={() => window.open(`http://rod3.devel1dub.eionet.europa.eu/obligations/${id}`)}
        />
      </div>

      <div className={`${styles.date}`}>
        {messages[language.selected]['title']}: <span className={styles.dueDate}>{date}</span>
      </div>
    </div>
  );
};
