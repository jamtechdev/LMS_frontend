import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MCQProps {
  question: any;
}

export const MCQQuestion: React.FC<MCQProps> = ({ question }) => {
  const dispatch = useDispatch();
  const qid = question.questions.id;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const options = question.question_options || [];
  const correctAnswer = options.find((option: any) => option.is_correct)?.value;

  const result = useSelector((state: any) => state.quiz.results[qid]);

  // Handle when an answer is selected
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsSubmitted(true); // Mark as submitted once an answer is selected
    dispatch(setAnswer({ questionId: qid, answer: answer })); // Dispatch the answer to Redux
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="p-4 mb-6 border rounded-md space-y-4">
      <div className="font-semibold mb-2">{question.questions.content}</div>

      <div className="flex flex-col gap-4">
        {options.map((option: any, idx: number) => {
          // Check if this option is the selected one
          const isSelected = selectedAnswer === option.value;

          return (
            <motion.button
              key={idx}
              onClick={() => handleAnswerSelect(option.value)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-2 border rounded-lg w-full",
                isSelected
                  ? isCorrect
                    ? "bg-green-400 border-green-500"
                    : "bg-red-400 border-red-500"
                  : "bg-white border-gray-300",
                !isSubmitted && "hover:bg-gray-50"
              )}
            >
              {option.value}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Section */}
      {isSubmitted && selectedAnswer && (
        <div className="mt-4 text-lg font-semibold">
          {isCorrect ? (
            <span className="text-green-700">✅ Correct!</span>
          ) : (
            <span className="text-red-700">
              ❌ Incorrect. The correct answer is:{" "}
              <strong>{correctAnswer}</strong>
            </span>
          )}
        </div>
      )}

      {/* Submit Button (optional, since feedback is immediate) */}
      {!isSubmitted && (
        <div className="mt-4">
          <button
            onClick={() => setIsSubmitted(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md w-full"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;
