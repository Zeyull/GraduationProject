declare interface QuestionOption {
  id: string;
  index: number;
  name: string;
  state: boolean;
  level?: string; // 3-difficult 2-medium 1-easy
  solutions?: number;
  passRate?: number;
}

declare interface DailyQuestionOption extends QuestionOption {
  date: string; // 日期
}
