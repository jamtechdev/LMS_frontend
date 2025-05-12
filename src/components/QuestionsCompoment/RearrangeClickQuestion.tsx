import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import type { Question } from "@/store/features/quiz/quizSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  // all possible words
  const options = question.question_options.map((o) => o.value);
  // what the user has picked so far
  const selected = useSelector(
    (s: RootState) => (s.quiz.answers[qid] as string[]) || []
  );
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
  };

  return (
    <div className="p-4 mb-6 border rounded-md">
      <div className="font-semibold mb-2">{question.questions.content}</div>

      {/* options */}
      <div className="flex flex-wrap gap-2 mb-4 p-4">
        {options.map((w) => (
          <motion.button
            key={w}
            onClick={() => handlePick(w)}
            disabled={
              selected.includes(w) || selected.length >= correctOrder.length
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

      {/* built sequence */}
      <div className="flex flex-wrap gap-2 mb-4 p-4">
        <AnimatePresence>
          {selected.map((w, i) => {
            // per‐pill class
            let pillClass = "bg-white border-gray-200";
            if (isComplete) {
              // once complete, all green or all red
              pillClass = isAllCorrect
                ? "bg-green-50 border-green-400"
                : "bg-red-50 border-red-400";
            } else {
              // before complete, highlight only if in correct slot
              if (w === correctOrder[i]) {
                pillClass = "bg-green-50 border-green-400";
              }
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

      {/* clear */}
      <button
        onClick={handleClear}
        disabled={selected.length === 0}
        className={cn(
          "text-sm underline",
          selected.length === 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-800"
        )}
      >
        Clear
      </button>
    </div>
  );
};
