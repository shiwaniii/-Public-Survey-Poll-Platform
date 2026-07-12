// export interface Survey {
//   id: number;
//   question: string;
//   description: string | null;
//   category: string | null;
//   creator_id: string;
//   is_active: boolean;
//   expires_at: string | null;
//   created_at: string;
// }

// export interface SurveyOption {
//   id: number;
//   survey_id: number;
//   choice_text: string;
//   display_order: number;
// }

// export interface OptionCount {
//   option_id: number;
//   survey_id: number;
//   choice_text: string;
//   display_order: number;
//   vote_count: number;
// }

// export interface SurveyWithOptionCount extends Survey {
//   option_count: number;
//   total_responses: number;
// }



export interface Survey {
  id: number;
  question: string;
  description: string | null;
  category: string | null;
  creator_id: string;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface SurveyOption {
  id: number;
  survey_id: number;
  choice_text: string;
  display_order: number;
}

export interface OptionCount {
  option_id: number;
  survey_id: number;
  choice_text: string;
  display_order: number;
  vote_count: number;
}

export interface SurveyWithOptionCount extends Survey {
  option_count: number;
  total_responses: number;
}

export interface SurveyComment {
  id: number;
  survey_id: number;
  user_id: string;
  comment: string;
  created_at: string;
  author_name?: string;
}
