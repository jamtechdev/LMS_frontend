// components/QuestionsCompoment/FillBlankQuiz.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { Question } from "@/store/features/quiz/quizSlice";
import { cn } from "@/lib/utils";

interface Props {
  question: Question;
}

export const FillBlankQuiz: React.FC<Props> = ({ question }) => {
  // guard off any non-fill_blank or missing answers:
  if (
    question.questions.type !== "fill_blank" ||
    !question.question_answers
  ) {
    return null;
  }

  const dispatch = useDispatch<AppDispatch>();
  const id = question.questions.id;

  // grab your array of strings from Redux (initially ["", ""] etc)
  const current = useSelector(
    (s: RootState) => (s.quiz.answers[id] as string[]) || []
  );
  // grab the grading result, e.g. [true,false]
  const result = useSelector(
    (s: RootState) => s.quiz.results[id] || []
  );

  // now you can safely do question.question_answers[0].answer
  const correct = question.question_answers[0].answer;
  const parts = question.questions.content.split(/({{blank_\d+}})/g);
  let blankIndex = 0;

  const handleChange = (i: number, v: string) => {
    const next = [...current];
    next[i] = v;
    dispatch(setAnswer({ questionId: id, answer: next }));
  };

  return (
    <div className="space-y-2 p-4 border rounded">
      <p className="flex flex-wrap gap-2">
        {parts.map((part, i) => {
          if (/{{blank_\d+}}/.test(part)) {
            const idx = blankIndex++;
            const isCorrect = result[idx];

            return (
              <input
                key={i}
                type="text"
                value={current[idx] || ""}
                onChange={(e) => handleChange(idx, e.target.value)}
                className={cn(
                  "w-20 px-2 py-1 border rounded",
                  isCorrect === true
                    ? "border-green-500"
                    : isCorrect === false
                    ? "border-red-500"
                    : "border-gray-300"
                )}
              />
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    </div>
  );
};
