import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import type { Question } from "@/store/features/quiz/quizSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

// 🆕 ShadCN card components
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  question: Question;
}

export const RearrangeClickQuestion: React.FC<Props> = ({ question }) => {
  if (
    question.questions.type !== "rearrange" ||
    !question.question_options ||
    !question.question_answers
  ) {
    return null;
  }

  const dispatch = useDispatch<AppDispatch>();
  const qid = question.questions.id;

  const correctOrder = question.question_answers[0].answer as string[];
  const options = question.question_options.map((o) => o.value);
  const selected = useSelector(
    (s: RootState) => (s.quiz.answers[qid] as string[]) || []
  );

  const [submitted, setSubmitted] = useState(false);
  const isComplete = selected.length === correctOrder.length;
  const isAllCorrect =
    isComplete && selected.every((w, i) => w === correctOrder[i]);

  const handlePick = (word: string) => {
    if (selected.length < correctOrder.length && !selected.includes(word)) {
      dispatch(setAnswer({ questionId: qid, answer: [...selected, word] }));
    }
  };

  const handleClear = () => {
    dispatch(setAnswer({ questionId: qid, answer: [] }));
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {question.questions.content}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 p-2">
          {options.map((w) => (
            <motion.button
              key={w}
              onClick={() => handlePick(w)}
              disabled={
                selected.includes(w) ||
                selected.length >= correctOrder.length ||
                submitted
              }
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-3 py-1 border rounded w-[90px] h-[30px] text-center",
                selected.includes(w)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              )}
            >
              {w}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 p-2">
          <AnimatePresence>
            {selected.map((w, i) => {
              let pillClass = "bg-white border-gray-200";
              if (submitted) {
                pillClass = isAllCorrect
                  ? "bg-green-50 border-green-400"
                  : "bg-red-50 border-red-400";
              }

              return (
                <motion.div
                  key={`${w}-${i}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "px-3 py-1 border rounded text-center w-[90px] h-[30px]",
                    pillClass
                  )}
                >
                  {w}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
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
