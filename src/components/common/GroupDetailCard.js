import React from 'react';
import { Card, Tooltip, Icon, Popconfirm, Switch } from 'antd';
import styles from './GroupDetailCard.module.sass';

const { Meta } = Card;

const description = props => {
  const { data, context } = props;
  const { unpublish, publish } = props;
  const {
    refererType,
    sort,
    status,
    labelName,
    firstPayment,
    monthlyPayment,
    subheading,
    salePrice,
    originalPrice,
    targetUrl,
    loading,
    mileage,
    plateDate,
    plateLocation,
  } = data;
  switch (refererType) {
  case 'ACTIVITE':
    return (
      <React.Fragment>
        <p>
          <span>状态：<Switch size="small" loading={loading} checked={status === 'y' ? true : false} onChange={status === 'y' ? unpublish.bind(context, data) : publish.bind(context, data)} /></span>
          <span>排序：{sort}</span>
        </p>
        <p>标签：{labelName}</p>
      </React.Fragment>
    );
  case 'CARMODEL':
    return (
      <React.Fragment>
        <p>新车价格：{salePrice}</p>
        <p>
          <span>首付：{firstPayment}</span>
          <span>月供：{monthlyPayment}</span>
        </p>
        <p>
          <span>状态：<Switch size="small" loading={loading} checked={status === 'y' ? true : false} onChange={status === 'y' ? unpublish.bind(context, data) : publish.bind(context, data)} /></span>
          <span>排序：{sort}</span>
        </p>
        <p>标签：{labelName}</p>
      </React.Fragment>
    );
  case 'MAINTAIN':
    return (
      <React.Fragment>
        <p>简介：{subheading}</p>
        <p>
          <span>销售价格：{salePrice}</span>
          <span style={{ textDecoration: 'line-through' }}>{originalPrice}</span>
        </p>
        <p>
          <span>状态：<Switch size="small" loading={loading} checked={status === 'y' ? true : false} onChange={status === 'y' ? unpublish.bind(context, data) : publish.bind(context, data)} /></span>
          <span>排序：{sort}</span>
        </p>
        <p>标签：{labelName}</p>
      </React.Fragment>
    );
  case 'WAP':
    return (
      <React.Fragment>
        <p>外链地址：{targetUrl}</p>
        <p>
          <span>状态：<Switch size="small" loading={loading} checked={status === 'y' ? true : false} onChange={status === 'y' ? unpublish.bind(context, data) : publish.bind(context, data)} /></span>
          <span>排序：{sort}</span>
        </p>
        <p>标签：{labelName}</p>
      </React.Fragment>
    );
  case 'SECOND_HAND_CAR':
    return (
      <React.Fragment>
        <p>简介：{plateDate}|{mileage}|{plateLocation}</p>
        <p>销售价格：{salePrice}</p>
        <p>
          <span>状态：<Switch size="small" loading={loading} checked={status === 'y' ? true : false} onChange={status === 'y' ? unpublish.bind(context, data) : publish.bind(context, data)} /></span>
          <span>排序：{sort}</span>
        </p>
        <p>标签：{labelName}</p>
      </React.Fragment>
    );
  default:
    return false;
  }
};

const imageStyles = props => {
  const { data } = props;
  const { refererType, refererPicture } = data;
  const defaultStyles = {
    backgroundImage: `url(${refererPicture})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  };
  switch (refererType) {
  case 'CARMODEL':
  case 'MAINTAIN':
  case 'SECOND_HAND_CAR':
    return {
      ...defaultStyles,
      width: 240,
      height: 160,
    };
  case 'ACTIVITE':
    return {
      ...defaultStyles,
      width: 240,
      height: 160,
    };
  case 'WAP':
    return {
      ...defaultStyles,
      width: 240,
      height: 160,
    };
  default:
    return {
      ...defaultStyles,
      width: 240,
      height: 160,
    };
  }
};

const GroupDetailCard = props => {
  const { data, context, style = {} } = props; 
  const { get, remove } = props; 
  const { name } = data;
  return (
    <Card
      hoverable
      style={
        {
          display: 'inline-block',
          margin: '0 10px 10px 0',
          width: 240,
          ...style,
        }
      }
      cover={
        <div
          title={name}
          style={
            {
              ...imageStyles(props),
            }
          }
        />
      }
      actions={
        [
          <Icon title="编辑" key="setting" type="setting" onClick={get.bind(context, data)} />,
          <Popconfirm key="delete" title={`是否确认删除 ${name}`} onConfirm={remove.bind(context, data)} okText="确定" cancelText="取消">
            <Icon title="删除" type="delete" />
          </Popconfirm>
        ]
      }
    >
      <Meta
        title={
          <Tooltip placement="topRight" title={name}>{name}</Tooltip>
        }
        description={
          <div className={styles.description}>{description(props)}</div>
        }
      />
    </Card>
  );
};

export default GroupDetailCard;
