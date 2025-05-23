import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
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
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };
  const handleSubmit = () => {
    setIsSubmitted(true);
    dispatch(setAnswer({ questionId: qid, answer: selectedAnswer }));
  };
  const isCorrect = selectedAnswer === correctAnswer;
  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>{question.questions.content}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {options.map((option: any, idx: number) => {
            const isSelected = selectedAnswer === option.value;
            const isMatched = isSubmitted && isSelected && isCorrect;
            const isWrong = isSubmitted && isSelected && !isCorrect;
            return (
              <motion.button
                key={idx}
                onClick={() => handleAnswerSelect(option.value)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 border rounded-lg w-full",
                  isMatched
                    ? "bg-green-400 border-green-500"
                    : isWrong
                    ? "bg-red-400 border-red-500"
                    : isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "bg-white border-gray-300",
                  !isSubmitted && "hover:bg-gray-50"
                )}
                disabled={isSubmitted}
              >
                {option.value}
              </motion.button>
            );
          })}
        </div>
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
        {!isSubmitted && (
          <div className="mt-4 text-right">
            <Button
              variant={"outline"}
              onClick={handleSubmit}
              className="px-5 py-2 text-white rounded dark"
            >
              Submit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MCQQuestion;
