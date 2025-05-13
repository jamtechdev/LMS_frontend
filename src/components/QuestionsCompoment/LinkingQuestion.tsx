import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import { cn } from "@/lib/utils";

// ShadCN components
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface LinkingQuestionProps {
  question: any;
}

export const LinkingQuestion: React.FC<LinkingQuestionProps> = ({
  question,
}) => {
  const dispatch = useDispatch();
  const qid = question.questions.id;
  const correctPairs = question.answer || [];
  const [leftWords, setLeftWords] = useState<any[]>([]);
  const [rightWords, setRightWords] = useState<any[]>([]);
  const [selectedPairs, setSelectedPairs] = useState<any[]>([]);
  const [currentSelection, setCurrentSelection] = useState<any | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const shuffleArray = (array: any[]) => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  useEffect(() => {
    const left = correctPairs.map((p: any) => p.left);
    const right = correctPairs.map((p: any) => p.right);
    setLeftWords(shuffleArray(left));
    setRightWords(shuffleArray(right));
  }, [question]);
  const handleWordSelect = (word: any) => {
    if (submitted) return;
    if (currentSelection) {
      if (currentSelection.word && word.word) {
        const match = correctPairs.some(
          (p) =>
            p.left.word === currentSelection.word && p.right.word === word.word
        );
        setIsCorrect(match);
        if (match) {
          setSelectedPairs((prev) => [
            ...prev,
            { left: currentSelection, right: word },
          ]);
        } else {
          setErrorFeedback(
            `❌ Incorrect. The correct pair is: ${currentSelection.word} - ${
              correctPairs.find((p) => p.left.word === currentSelection.word)!
                .right.word
            }`
          );
        }
        dispatch(
          setAnswer({
            questionId: qid,
            answer: { left: currentSelection, right: word },
          })
        );
        setCurrentSelection(null);
      }
    } else {
      setCurrentSelection(word);
      setErrorFeedback(null);
      setIsCorrect(null);
    }
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };
  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>{question.questions.content}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 w-1/2">
            {leftWords.map((w) => {
              const selected = currentSelection?.word === w.word;
              const matched = selectedPairs.some((p) => p.left.word === w.word);
              return (
                <button
                  key={w.word}
                  onClick={() => handleWordSelect(w)}
                  className={cn(
                    "p-2 border rounded w-full text-left",
                    matched
                      ? "border-green-500 bg-green-50"
                      : selected
                      ? "border-blue-500"
                      : "border-gray-200"
                  )}
                >
                  {w.word}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            {rightWords.map((w) => {
              const matched = selectedPairs.some(
                (p) => p.right.word === w.word
              );
              const wrong =
                isCorrect === false &&
                currentSelection?.word !== undefined &&
                currentSelection.word !== w.word;
              return (
                <button
                  key={w.word}
                  onClick={() => handleWordSelect(w)}
                  className={cn(
                    "p-2 border rounded w-full text-left",
                    matched
                      ? "border-green-500 bg-green-50"
                      : wrong
                      ? "border-red-500"
                      : "border-gray-200"
                  )}
                >
                  {w.word}
                </button>
              );
            })}
          </div>
        </div>
        {selectedPairs.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Matched Pairs:</h3>
            <ul className="space-y-1">
              {selectedPairs.map((p, i) => (
                <li key={i}>
                  {p.left.word} — {p.right.word}
                </li>
              ))}
            </ul>
          </div>
        )}
        {errorFeedback && (
          <div className="text-red-600 font-medium">{errorFeedback}</div>
        )}

        <div className="text-right">
          <Button onClick={handleSubmit} disabled={submitted}>
            {submitted ? "Submitted" : "Submit"}
          </Button>
        </div>
        {submitted && selectedPairs.length === correctPairs.length && (
          <div className="font-medium text-green-700">
            All pairs matched correctly!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkingQuestion;
