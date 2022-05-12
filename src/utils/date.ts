import moment from 'moment';
import * as _ from 'lodash';
moment.locale('zh-cn');
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthDaysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const monthName = [
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
  'Dec',
];
export const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const dayNameCH = ['日', '一', '二', '三', '四', '五', '六'];

// 函数getMonthRecent的返回值对象接口
interface GetMonthRecentRes {
  year: number[]; // 年份数组
  day: number; // 当前星期
  date: number; // 当前日期
  month: number; // 当前月份
  monthDays: number[]; // 每月天数
  monthNames: string[]; // 每月名字缩写
}

interface OneDay {
  year: number;
  month: number; // [1,12]
  date: number;
  day: number; // [0,6] 周天为0，周六为6
}

/**
 * 查询今今月之前,前n月及每月的数
 * @param n 查询的月份数
 * @returns 返回包含日期信息的对象
 */
export function getMonthRecent(n = 12): GetMonthRecentRes {
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth() + 1;
  const nowDay = date.getDay(); // 星期
  const nowDate = date.getDate(); // 日期
  const isLeapYear = isLeap(nowYear);
  const res: GetMonthRecentRes = {
    year: [],
    day: nowDay,
    date: nowDate,
    month: nowMonth,
    monthDays: [],
    monthNames: [],
  };
  if (nowMonth === n) {
    res.monthDays = isLeapYear ? monthDaysLeap : monthDays;
    res.monthNames = monthName;
  } else {
    let index = n;
    let indexMonth = nowMonth;
    let tempDays = [];
    let tempNames = [];
    let tempYear = nowYear;
    let tempYearArr = [];
    while (index !== 0) {
      tempDays.unshift(
        isLeapYear ? monthDaysLeap[indexMonth - 1] : monthDays[indexMonth - 1],
      );
      tempNames.unshift(monthName[indexMonth - 1]);
      tempYearArr.unshift(tempYear);
      indexMonth--;
      if (indexMonth === 0) {
        indexMonth += 12;
        tempYear--;
      }
      index--;
    }
    res.monthDays = tempDays;
    res.monthNames = tempNames;
    res.year = tempYearArr;
  }
  return res;
}

/**
 * 判断是否为闰年
 * @param year 输入年份
 * @returns 闰年则为true
 */
export function isLeap(year: number) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

/**
 * 返回当前日期 待修改
 * @type string
 * L: "YYYY/MM/DD"
 * year month date
 * @returns
 */
export function getNowDate(type: string) {
  const nowMoment = moment();
  if (type === 'L') {
    return nowMoment.format('L');
  } else if (type === 'date') {
    return nowMoment.date();
  }
}

/**
 * 当前月份每一天信息数组 待补充boolean
 * @returns [{year,month,date,day}...]
 */
export function getNowMonthCalendar(): OneDay[] {
  const nowMoment = moment();
  const year = nowMoment.year();
  const monthNumber = nowMoment.month(); // [0,11]
  const monthString = _.padStart((nowMoment.month() + 1).toString(), 2, '0');
  const days = isLeap(year)
    ? monthDaysLeap[monthNumber]
    : monthDays[monthNumber];
  const res: OneDay[] = [];
  for (let i = 1; i <= days; i++) {
    res.push({
      year,
      month: monthNumber + 1,
      date: i,
      day: moment(
        `${year}-${monthString}-${_.padStart(i.toString(), 2, '0')}`,
      ).day(),
    });
  }
  return res;
}
