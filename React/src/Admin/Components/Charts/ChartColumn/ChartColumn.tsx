import { Column } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { ColumnConfig } from "@ant-design/plots";

const ChartColumn = () => {
  const data = [
    {
      city: "Ho Chi Minh",
      type: "茶叶",
      value: 7000,
    },
    {
      city: "Da Nang",
      type: "水果",
      value: 9000,
    },

    {
      city: "Bien Hoa",
      type: "水果",
      value: 16000,
    },
    {
      city: "Hue",
      type: "米面",
      value: 5000,
    },
    {
      city: "Tien Giang",
      type: "特产零食",
      value: 6000,
    },
    {
      city: "Quang Ngai",
      type: "茶叶",
      value: 10000,
    },
    {
      city: "Ha Noi",
      type: "水果",
      value: 14000,
    },
    {
      city: "Nghe An",
      type: "米面",
      value: 9000,
    },
    {
      city: "Ca Mau",
      type: "特产零食",
      value: 10000,
    },
    {
      city: "Hai Phong",
      type: "茶叶",
      value: 9000,
    },
    {
      city: "Bac Cac",
      type: "水果",
      value: 14000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 9000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 9000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 3000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 9000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 8000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 5500,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 9000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 300,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 4000,
    },
    {
      city: "Vinh Cuu",
      type: "米面",
      value: 4400,
    },
  ];

  const config = {
    data,
    legend: false,
    width: 100,
    xField: "city",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  } as ColumnConfig;

  return <Column {...config} />;
};

export default ChartColumn;
