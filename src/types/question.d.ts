declare interface QuestionOption {
  question_id: number;
  question_index: number;
  question_name: string;
  state: number;
  level?: number; // 3-difficult 2-medium 1-easy
  solutions?: number;
  passRate?: number;
}

declare interface DailyQuestionOption extends QuestionOption {
  date: string; // 日期
}

// 更详细的题目信息
declare interface DetailQuestionOption extends QuestionOption {
  allSubmission?: number;
  successSubmission?: number;
  content: string;
}

declare interface QuestionSubmissionHistory {
  state: 1;
  language?: string;
  date: string;
  time?: number;
  question_index?: number;
  question_name?: string;
  level?: number;
}

declare interface FrontQuestion {
  fquestion_id: number;
  question_name: string;
  question_content: string;
}
