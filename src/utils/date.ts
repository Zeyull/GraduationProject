const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthDaysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthName = [
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

// 函数getMonthRecent的返回值对象接口
interface getMonthRecentRes {
  year: number[]; // 年份数组
  day: number; // 星期
  date: number; // 日期
  month: number; // 月份
  monthDays: number[]; // 每月天数
  monthNames: string[]; // 每月名字缩写
}

/**
 * 查询今今月之前,前n月及每月的数
 * @param n 查询的月份数
 * @returns 返回包含日期信息的对象
 */
export function getMonthRecent(n = 12) {
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth() + 1;
  const nowDay = date.getDay(); // 星期
  const nowDate = date.getDate(); // 日期
  const isLeapYear = isLeap(nowYear);
  const res: getMonthRecentRes = {
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
