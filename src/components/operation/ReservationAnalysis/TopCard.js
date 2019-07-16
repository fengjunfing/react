import React from 'react';
import styles from './TopCard.module.sass';

const topCard = {
  'AMOUNT': {
    'title': '预约金额',
    'content': [
      {
        'desc': '预约单数',
        'key': ['statisticsBespeakDay', 'totalCount']
      },
      {
        'desc': '金额',
        'key': ['statisticsBespeakDay', 'totalAmount']
      },
    ],
  },
  'SEX': {
    'title': '预约性别',
    'content': [
      {
        'desc': '男数量',
        'key': ['statisticsBespeakDay', 'maleCount']
      },
      {
        'desc': '女数量',
        'key': ['statisticsBespeakDay', 'femaleCount']
      },
    ],
  },
  'HANDLE': {
    'title': '预约处理',
    'content': [
      {
        'desc': '处理数量',
        'key': ['statisticsBespeakHandleDay', 'totalCount']
      },
      {
        'desc': '流单数量',
        'key': ['statisticsBespeakHandleDay', 'flowCount']
      },
      {
        'desc': '贷款数量',
        'key': ['statisticsBespeakHandleDay', 'loanCount']
      },
      {
        'desc': '全款数量',
        'key': ['statisticsBespeakHandleDay', 'fullCount']
      },
    ],
  },
};

const TopCard = ({ type, data = {} }) => {
  if (!type) { return null; }
  return (<div className={styles['top-card']}>
    <h1>{topCard[type].title}</h1>
    <div className={styles['top-card-content']}>
      {
        topCard[type].content.map((v, i) => (
          <div key={i}>{data.getIn(v.key)}</div>
        ))
      }
    </div>
    <div className={styles['top-card-desc']}>
      {
        topCard[type].content.map((v, i) => (
          <div key={i}>{v.desc}</div>
        ))
      }
    </div>
  </div>);
};

export default TopCard;
