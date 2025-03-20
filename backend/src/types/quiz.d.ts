export interface Quiz {
    category: string;
    type: "multiple";
    difficulty: "easy" | "medium" | "hard";
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }

  export interface QuizCategory {
    id: number;
    name: string;
  }

  export interface QuizResponse {
    results: Quiz[];
  }
  