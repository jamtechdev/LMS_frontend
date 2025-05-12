import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LinkingQuestionProps {
  question: any;
}

export const LinkingQuestion: React.FC<LinkingQuestionProps> = ({ question }) => {
  const dispatch = useDispatch();
  const qid = question.questions.id;

  // Safely get the correct answer pairs, if they exist
  const correctPairs = question.question_answers[0]?.pairs || [];

  const [leftWords, setLeftWords] = useState<any[]>([]);
  const [rightWords, setRightWords] = useState<any[]>([]);
  const [currentSelection, setCurrentSelection] = useState<any | null>(null);

  // Shuffle function to randomize the word order
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize the words on component load
  useEffect(() => {
    const left = question.question_options.filter((opt: any) => opt.label.startsWith("A"));
    const right = question.question_options.filter((opt: any) => opt.label.startsWith("B"));

    // Shuffle the words each time the component is rendered or updated
    setLeftWords(shuffleArray(left));
    setRightWords(shuffleArray(right));
  }, [question]);

  // Update state when an answer is selected
  const handleWordSelect = (word: any) => {
    if (currentSelection) {
      dispatch(setAnswer({ questionId: qid, answer: { ...currentSelection, word } }));
      setCurrentSelection(null); // Reset selection after matching
    } else {
      setCurrentSelection(word); // Select word to be matched
    }
  };

  // Check if the current pair is correct
  const checkMatch = (left: any, right: any) => {
    // Ensure correctPairs is not empty
    if (correctPairs.length === 0) return false;
    
    const isMatch = correctPairs.some(
      (pair: any) => pair.left.word === left.value && pair.right.word === right.value
    );
    return isMatch;
  };

  return (
    <div className="p-4 mb-6 border rounded-md space-y-4">
      <div className="font-semibold mb-2">{question.questions.content}</div>

      <div className="flex gap-4">
        <div className="w-1/2">
          {/* Left Column */}
          {leftWords.map((word, idx) => {
            const isSelected = currentSelection?.id === word.id;
            const isMatched = currentSelection && checkMatch(currentSelection, word);
            return (
              <motion.button
                key={word.id}
                onClick={() => handleWordSelect(word)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 border rounded-md w-full mb-2",
                  isSelected ? "bg-blue-50" : "bg-white",
                  isMatched ? "bg-green-500" : "border-gray-300",
                  isMatched && "bg-green-100"
                )}
              >
                {word.value}
              </motion.button>
            );
          })}
        </div>

        <div className="w-1/2">
          {/* Right Column */}
          {rightWords.map((word, idx) => {
            const isMatched = currentSelection && checkMatch(currentSelection, word);
            return (
              <motion.button
                key={word.id}
                onClick={() => handleWordSelect(word)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 border rounded-md w-full mb-2",
                  isMatched ? "bg-green-500" : "border-gray-300",
                )}
              >
                {word.value}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Feedback Section */}
      {currentSelection && (
        <div className="mt-4">
          <span className="text-lg">
            Selected: <strong>{currentSelection.value}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default LinkingQuestion;
