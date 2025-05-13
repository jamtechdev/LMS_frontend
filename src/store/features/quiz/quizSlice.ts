// quizSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type QuestionType = "fill_blank" | "spelling" | "rearrange" | "linking" | "true_false" | "mcq" | "image_mcq";

export interface Question {
    questions: {
        id: number;
        type: QuestionType;
        content: string;
        metadata: any;
    };
    question_options?: any[];
    question_answers?: any[];
}

export interface QuizState {
    questions: Question[];
    answers: Record<number, any>;
    results: Record<number, boolean[] | boolean>;
    score: number | null;
}

const initialState: QuizState = {
    questions: [],
    answers: {},
    results: {},
    score: null,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        loadQuestions(state, action: PayloadAction<Question[]>) {
            state.questions = action.payload;
            state.answers = {};
            state.results = {};
            state.score = null;
            action.payload.forEach((q) => {
                const id = q.questions.id;
                switch (q.questions.type) {
                    case "true_false":
                        state.answers[id] = { choice: "", explanation: "" };
                        break;
                    default:
                        state.answers[id] = null;
                }
            });
        },

        setAnswer(state, action: PayloadAction<{ questionId: number; answer: any }>) {
            const { questionId, answer } = action.payload;
            state.answers[questionId] = answer;

            const q = state.questions.find((q) => q.questions.id === questionId);
            if (!q) return;

            // ✅ Check for correct true_false answer
            if (q.questions.type === "true_false") {
                const correctAnswer = q.question_answers?.[0]?.answer?.choice;
                state.results[questionId] = answer.choice === correctAnswer;
            }

            // Existing fill_blank logic
            if (q.questions.type === "fill_blank") {
                const correctAnswers = q.question_answers?.[0]?.answer || [];
                state.results[questionId] = correctAnswers.map((correctAnswer: any, index: any) => {
                    return correctAnswer.toLowerCase() === answer[index]?.toLowerCase();
                });
            }
        },

        submitAll(state) {
            let score = 0;
            state.questions.forEach((q) => {
                const id = q.questions.id;
                const res = state.results[id] || [];
                if (Array.isArray(res)) {
                    if (res.every((r) => r)) score++; // All blanks correct
                } else if (res) {
                    score++; // Single correct answer
                }
            });
            state.score = score;
        },
    },
});

export const { loadQuestions, setAnswer, submitAll } = quizSlice.actions;
export default quizSlice.reducer;

