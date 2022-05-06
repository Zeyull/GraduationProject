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

// 更详细的题目信息
declare interface DetailQuestionOption extends QuestionOption {
  allSubmission: number;
  successSubmission: number;
}

declare interface QuestionSubmissionHistory {
  result: boolean;
  language?: string;
  submitTime: string; // YYYY/MM/DD TT:TT
  consumeTime?: number;
  questionIndex?: number;
  questionName?: string;
  questionLevel?: string;
}

declare interface FrontQuestion {
  fquestion_id: number;
  question_name: string;
  question_content: string;
}
