import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ShadCN components
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface ImageMCQProps {
  question: any;
}

export const ImageMCQQuestion: React.FC<ImageMCQProps> = ({ question }) => {
  const dispatch = useDispatch();
  const qid = question.questions.id;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const options = question.question_options || [];
  const correctAnswer = options.find((option: any) => option.is_correct)?.value;

  const result = useSelector((state: any) => state.quiz.results[qid]);

  // Handle when an image is selected
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer); // Save the selected answer
  };

  // Handle submit action
  const handleSubmit = () => {
    setIsSubmitted(true); // Mark as submitted
    dispatch(setAnswer({ questionId: qid, answer: selectedAnswer })); // Dispatch the answer to Redux
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
            // Check if this option is the selected one
            const isSelected = selectedAnswer === option.value;
            const isMatched = isSubmitted && isSelected && isCorrect;
            const isWrong = isSubmitted && isSelected && !isCorrect;

            return (
              <motion.div
                key={idx}
                onClick={() => handleAnswerSelect(option.value)} // Handle answer selection
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-4 border rounded-lg w-full flex justify-center items-center",
                  isMatched
                    ? "border-green-500 bg-green-100" // Green for correct answer after submit
                    : isWrong
                    ? "border-red-500 bg-red-100" // Red for incorrect answer after submit
                    : isSelected
                    ? "border-blue-500 bg-blue-50" // Blue border when selected but not submitted
                    : "bg-white border-gray-300", // Default for unselected answer
                  !isSubmitted && "cursor-pointer hover:bg-gray-50" // Add hover effect if not submitted
                )}
                disabled={isSubmitted} // Disable options after submission
              >
                <img
                  src={option.value}
                  alt={`Option ${idx + 1}`}
                  className="w-20 h-20 object-contain" // You can adjust the size of the image as needed
                />
              </motion.div>
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
                <strong className="text-green-700 flex ">
                  <img src={correctAnswer} alt="" className="w-10 h-10 mt-5" />
                </strong>
              </span>
            )}
          </div>
        )}

        {/* Submit Button */}

        <div className="mt-4 text-right">
          <Button
            variant={"outline"}
            onClick={handleSubmit}
            className="px-5 py-2 text-white rounded dark"
            disabled={isSubmitted} // Disable submit if no answer is selected
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageMCQQuestion;
