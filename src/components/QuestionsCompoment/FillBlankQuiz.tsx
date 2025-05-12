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
  if (question.questions.type !== "fill_blank" || !question.question_answers) {
    return null;
  }

  const dispatch = useDispatch<AppDispatch>();
  const id = question.questions.id;

  // Get the current answers from Redux (array of answers)
  const current = useSelector(
    (s: RootState) => (s.quiz.answers[id] as string[]) || []
  );
  const result = useSelector((s: RootState) => s.quiz.results[id] || []);

  // The correct answers are stored in question_answers[0].answer
  const correct = question.question_answers[0].answer;

  // Split the content of the question to identify where the blanks are
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
            const isCorrect = result[idx]; // Check if this blank is correct
            console.log(isCorrect);

            return (
              <input
                key={i}
                type="text"
                value={current[idx] || ""}
                onChange={(e) => handleChange(idx, e.target.value)}
                className={cn(
                  "w-20 px-2 py-1 border rounded",
                  isCorrect === true
                    ? "bg-green-500"
                    : isCorrect === false
                    ? "bg-red-500"
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
