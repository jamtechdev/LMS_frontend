import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { cn } from "@/lib/utils";

interface TrueFalseQuestionProps {
  question: any;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
}) => {
  if (
    question.questions.type !== "true_false" ||
    !question.question_options ||
    !question.question_answers
  ) {
    return null;
  }

  const dispatch = useDispatch<AppDispatch>();
  const qid = question.questions.id;

  const current = useSelector(
    (s: RootState) =>
      (s.quiz.answers[qid] as { choice: string; explanation: string }) ?? {
        choice: "",
        explanation: "",
      }
  );

  const result = useSelector(
    (s: RootState) => s.quiz.results[qid] as boolean | undefined
  );

  const correctAnswer = question.question_answers[0].answer.choice;
  const options = question.question_options as { question_id: number; value: string }[];

  // Handle the answer selection
  const selectChoice = (value: string) => {
    if (current.choice === value) return; // Prevent re-selecting the same answer
    dispatch(
      setAnswer({
        questionId: qid,
        answer: { ...current, choice: value },
      })
    );
  };

  // Handle explanation change
  const changeExplanation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setAnswer({
        questionId: qid,
        answer: { ...current, explanation: e.target.value },
      })
    );
  };

  return (
    <div
      className={cn(
        "p-4 rounded-md border",
        result === undefined
          ? "border-gray-200"
          : result
          ? "border-green-500 bg-green-50"
          : "border-red-500 bg-red-50"
      )}
    >
      <div className="mb-4">{question.questions.content}</div>

      <div className="flex gap-4 mb-4">
        {options.map((opt, idx) => (
          <button
            key={opt.value}
            onClick={() => selectChoice(opt.value)}
            className={cn(
              "flex-1 px-4 py-2 border rounded-lg",
              current.choice === opt.value
                ? "bg-blue-50 border-blue-300"
                : "bg-white border-gray-200",
              result !== undefined &&
                current.choice === opt.value &&
                (result ? "border-green-500" : "border-red-500")
            )}
          >
            <span className="inline-block w-5 h-5 mr-2 text-center">{idx + 1}</span>
            {opt.value}
          </button>
        ))}
      </div>

      <textarea
        value={current.explanation}
        onChange={changeExplanation}
        placeholder="Explain your answer"
        className="w-full border px-2 py-1 rounded mb-4"
        rows={3}
      />

      {/* Feedback Section */}
      {result !== undefined && (
        <div
          className={cn("font-medium", result ? "text-green-700" : "text-red-700")}
        >
          {result
            ? "✅ Correct!"
            : `❌ Incorrect. The correct answer is: ${correctAnswer}`}
        </div>
      )}
    </div>
  );
};

export default TrueFalseQuestion;
