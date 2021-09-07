import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useSelector } from 'react-redux';
function Index() {
  const [paramLabel1, setparamLabel1] = useState('Savings');
  const [paramLabel2, setparamLabel2] = useState('Chequings');
  const [graphData, setGraphData] = useState<any>([]);
  const [graph2Data, setGraph2Data] = useState<any>([]);
  const selectedDate = useSelector((state: any) => state.selectedDate);
  const chartType = useSelector((state: any) => state.chartType);
  const currentResponse = useSelector(
    (state: any) => state.currentResponseChart
  );

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  function rotateItems(n: number, a: any) {
    const b = a.splice(0, n);
    const c = [...a, ...b];
    return c;
  }

  function processResults(category: string, dateType: number) {
    let date2: any,
      date3: any = null;

    if (dateType === 1) {
      date2 = moment().subtract(7, 'days').format('YYYY-MM-DD');
      date3 = moment(new Date(moment.now())).format('YYYY-MM-DD');
    } else {
      date2 = selectedDate.dateFrom;
      date3 = selectedDate.dateTo;
    }
    let numbofDays: number = 0;
    var a = moment(date3);
    var b = moment(date2);
    numbofDays = a.diff(b, 'days');
    let newdays: any = [];
    let newmonth: any = [];
    let dateFormat: string = '';
    if (numbofDays <= 10) {
      newdays = rotateItems(days.indexOf(moment(date2).format('ddd')), days);
      dateFormat = 'ddd';
    } else {
      newmonth = rotateItems(
        months.indexOf(moment(date2).format('MMM')),
        months
      );
      dateFormat = 'MMM';
    }

    let type1,
      objType1,
      objType2 = '';

    let objType22 = '';
    const final2 = {};
    const final = {};

    if (category === 'Accounts') {
      type1 = 'savings';
      objType1 = 'Savings';
      objType2 = 'Chequings';
      if (numbofDays <= 10) {
        newdays.forEach((item: any) => {
          final[item] = { name: item, Savings: 0, Chequings: 0 };
        });
      } else {
        newmonth.forEach((item: any) => {
          final[item] = { name: item, Savings: 0, Chequings: 0 };
        });
      }
    } else if (category === 'Transactions') {
      const branches = currentResponse.response.data[category].map(
        (item) => item.branch
      );

      type1 = 'credit';
      objType1 = 'Credit';
      objType2 = 'Debit';
      objType22 = 'Transactions';
      if (numbofDays <= 10) {
        newdays.forEach((item: any) => {
          final[item] = { name: item, Credit: 0, Debit: 0 };
        });
      } else {
        newmonth.forEach((item: any) => {
          final[item] = { name: item, Credit: 0, Debit: 0 };
        });
      }
      branches.forEach((item: any) => {
        final2[item] = { name: item, Transactions: 0, Debit: 0 };
      });
    }

    currentResponse.response.data[category].forEach((item: any) => {
      if (item.type === type1) {
        final[moment(item.created_at).format(dateFormat)][objType1] =
          parseInt(
            final[moment(item.created_at).format(dateFormat)][objType1]
          ) + 1;
      } else {
        final[moment(item.created_at).format(dateFormat)][objType2] =
          parseInt(
            final[moment(item.created_at).format(dateFormat)][objType2]
          ) + 1;
      }
      if (category === 'Transactions') {
        final2[item.branch][objType22] =
          parseInt(final2[item.branch][objType22]) + 1;
      }
    });

    const resultDays = Object.keys(final).map((key) => final[key]);
    const result2Days = Object.keys(final2).map((key) => final2[key]);
    setGraphData(resultDays);
    if (category === 'Transactions') setGraph2Data(result2Days);
    setparamLabel1(objType1);
    setparamLabel2(objType2);
  }

  useEffect(() => {
    if (
      currentResponse &&
      currentResponse.response.data[currentResponse.requestType].length > 0
    ) {
      processResults(currentResponse.requestType, currentResponse.dateType);
    }
  }, [currentResponse]);

  return (
    <>
      {chartType === 2 ? (
        <ResponsiveContainer>
          <BarChart width={400} height={250} data={graph2Data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Transactions" fill="#c70b0b" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer>
          <BarChart width={400} height={250} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={paramLabel1} fill="#8884d8" />
            <Bar dataKey={paramLabel2} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default Index;
