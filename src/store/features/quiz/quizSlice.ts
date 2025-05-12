import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type QuestionType =
    | "fill_blank"
    | "spelling"
    | "rearrange"
    | "linking"
    | "true_false"
    | "mcq"
    | "image_mcq";

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
    // answers keyed by question ID
    answers: Record<number, any>;
    // grading results keyed by question ID: an array of booleans (one per blank / sub-part)
    results: Record<number, boolean[]>;
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
                // initialize empty answers
                if (q.questions.type === "fill_blank") {
                    const ans = q.question_answers![0].answer;
                    state.answers[q.questions.id] = Array.isArray(ans)
                        ? new Array(ans.length).fill("")
                        : [""];
                } else if (q.questions.type === "true_false") {
                    state.answers[q.questions.id] = {
                        choice: "",
                        explanation: "",
                    };
                } else {
                 
                    state.answers[q.questions.id] = null;
                }
            });
        },

        // for fill_blank: payload.answer is string[]
        // for true_false: payload.answer is { choice, explanation }
        setAnswer(
            state,
            action: PayloadAction<{ questionId: number; answer: any }>
        ) {
            state.answers[action.payload.questionId] = action.payload.answer;
        },

        // grade all loaded questions
        submitAll(state) {
            let correctCount = 0;

            state.questions.forEach((q) => {
                const qid = q.questions.id;
                const userAns = state.answers[qid];
                let result: boolean[] = [];

                if (q.questions.type === "fill_blank") {
                    const correct = Array.isArray(q.question_answers![0].answer)
                        ? q.question_answers![0].answer
                        : [q.question_answers![0].answer];

                    result = correct.map((corr: any, i: any) => {
                        const ans = (userAns as string[])[i] || "";
                        return ans.trim().toLowerCase() === corr.trim().toLowerCase();
                    });

                } else if (q.questions.type === "true_false") {
                    const corr = q.question_answers![0].answer.choice;
                    const isOk = (userAns as any).choice === corr;
                    result = [isOk];
                } else {
                    // default no-op
                    result = [false];
                }

                state.results[qid] = result;
                if (result.every((r) => r)) correctCount += 1;
            });

            state.score = correctCount;
        },
    },
});

export const { loadQuestions, setAnswer, submitAll } = quizSlice.actions;
export default quizSlice.reducer;
