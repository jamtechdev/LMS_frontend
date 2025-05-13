import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer, submitAll } from "@/store/features/quiz/quizSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { Question } from "@/store/features/quiz/quizSlice";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

// Import ShadCN UI Card component
interface Props {
  question: Question;
}

export const FillBlankQuiz: React.FC<Props> = ({ question }) => {
  console.log(question, "question?.img_url");
  if (question.questions.type !== "fill_blank" || !question.question_answers) {
    return null;
  }

  const dispatch = useDispatch<AppDispatch>();
  const id = question.questions.id;
  const current = useSelector(
    (s: RootState) => (s.quiz.answers[id] as string[]) || []
  );
  const result = useSelector((s: RootState) => s.quiz.results[id] || []);

  const correct = question.question_answers[0].answer;
  const parts = question.questions.content.split(/({{blank_\d+}})/g);

  let blankIndex = 0;

  const handleChange = (i: number, v: string) => {
    const next = [...current];
    next[i] = v;
    dispatch(setAnswer({ questionId: id, answer: next }));
  };

  // Track whether the user has submitted answers
  const [submitted, setSubmitted] = useState(false);

  // Handle submission of the answers
  const handleSubmit = () => {
    setSubmitted(true);
    dispatch(submitAll());
  };

  return (
    <Card className="space-y-2 p-4 border rounded-xl">
      <CardTitle className="text-lg font-semibold">
        Fill in the blanks
      </CardTitle>
      <CardContent className="space-y-2">
        <p className="flex flex-wrap gap-2">
          {parts.map((part, i) => {
            if (/{{blank_\d+}}/.test(part)) {
              const idx = blankIndex++;
              const isCorrect = result[idx] === true;

              return (
                <input
                  key={i}
                  type="text"
                  value={current[idx] || ""}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  disabled={submitted}
                  className={cn(
                    "w-20 px-2 py-1 border rounded",
                    submitted
                      ? isCorrect
                        ? "bg-green-50 border-green-400"
                        : "bg-red-50 border-red-400"
                      : "border-gray-300"
                  )}
                />
              );
            }

            return <span key={i}>{part}</span>;
          })}
        </p>
        {question?.questions?.img_url && (
          <img
            src={question?.questions?.img_url}
            alt="Question Image"
            className="mx-auto my-4 w-[300px] h-[200px]"
          />
        )}

        <div className="mt-4 text-right">
          <Button
            variant={"outline"}
            onClick={handleSubmit}
            className="px-5 py-2 text-white rounded dark"
            disabled={submitted}
          >
            {submitted ? "Submitted" : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FillBlankQuiz;
