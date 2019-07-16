import React from 'react';
import styles from './TopCard.module.sass';

const topCard = {
  'TOTAL': {
    'title': '总订单',
    'countKey': 'totalCount',
    'amountKey': 'totalAmount',
  },
  'FULL': {
    'title': '全款订单',
    'countKey': 'fullCount',
    'amountKey': 'fullAmount',
  },
  'LOAN': {
    'title': '贷款订单',
    'countKey': 'loanCount',
    'amountKey': 'loanAmount',
  },
};

const TopCard = ({ type, data = {} }) => {
  if (!type) { return null; }
  return (<div className={styles['top-card']}>
    <h1>{topCard[type].title}</h1>
    <div className={styles['top-card-content']}>
      <div>{data.get(topCard[type].countKey)}</div>
      <div>{data.get(topCard[type].amountKey)}</div>
    </div>
    <div className={styles['top-card-desc']}>
      <div>订单数</div>
      <div>金额</div>
    </div>
  </div>);
};

export default TopCard;
