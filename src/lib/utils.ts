import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getNextResetTimeString(subscriptionTimestamp: number): string {
  const subscriptionDate = new Date(subscriptionTimestamp)
  const now = new Date()

  // 获取订阅的月份和日期
  const subscriptionMonth = subscriptionDate.getMonth()
  const subscriptionDay = subscriptionDate.getDate()

  // 创建下一次重置时间的日期对象
  let nextResetDate = new Date(now.getFullYear(), now.getMonth(), subscriptionDay)

  // 如果当前日期已经超过了下一次重置时间，则计算再下一个月的同一天
  if (now >= nextResetDate) {
    nextResetDate = new Date(now.getFullYear(), now.getMonth() + 1, subscriptionDay)
  }

  // 格式化日期
  const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  const monthName = monthNames[nextResetDate.getMonth()]
  const day = nextResetDate.getDate()
  const year = nextResetDate.getFullYear()

  // 根据日期确定正确的日期后缀
  const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : day % 10 === 0 ? 0 : day % 10]

  return `${monthName} ${day}${suffix}, ${year}.`
}
//
// // 示例用法
// const subscriptionTimestamp = new Date('2023-01-15').getTime(); // 订阅时间戳
// const nextResetTimeString = getNextResetTimeString(subscriptionTimestamp);
// console.log(nextResetTimeString); // 输出下一次重置时间
