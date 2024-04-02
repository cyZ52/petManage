import React from 'react';
import { Pie } from '@ant-design/plots';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const CustomLabel = ({ datum }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    <div style={{ width: 8, height: 8, background: 'rgba(0,0,0,0.4)', borderRadius: '50%' }} />
    <div>
      {datum.type} : <b>{datum.value}</b>
    </div>
  </div>
);

const DemoPie = () => {
  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'type',
      position: 'outside',
      textAlign: 'center',
      content: {
        style: {
          transform: 'contrastReverse',
        },
        renderer: (text, item, index) => <CustomLabel datum={item} />,
      },
    },
    legend: false,
  };
  return <Pie {...config} />;
};

export default DemoPie;
