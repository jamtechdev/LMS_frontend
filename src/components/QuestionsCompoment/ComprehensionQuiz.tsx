import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer, submitAll } from "@/store/features/quiz/quizSlice";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  question: any;
}

const ComprehensionQuiz: React.FC<{ question: any }> = ({ question }) => {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const { passage, sub_questions } = question.questions;

  const handleSubmit = () => {
    setSubmitted(true);
    dispatch(submitAll());
  };

  return (
    <div className="p-4 space-y-6">
      <Card className="space-y-4 p-4 border rounded-xl">
        <CardTitle className="text-lg font-semibold">Passage</CardTitle>
        <CardContent>
          <p className="text-gray-800">{passage}</p>
        </CardContent>
      </Card>
      {sub_questions.map((subQuestion: any, idx: number) => (
        <Card key={subQuestion.id} className="space-y-4 p-4 border rounded-xl">
          <CardTitle className="text-lg font-semibold">
            {subQuestion.content}
          </CardTitle>
          <CardContent>
            {subQuestion.type === "mcq" && (
              <div className="space-y-2">
                {subQuestion.options.map((option: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() =>
                      dispatch(
                        setAnswer({
                          questionId: subQuestion.id,
                          answer: option.value,
                        })
                      )
                    }
                    className={cn(
                      "w-full px-4 py-2 text-left",
                      submitted && option.is_correct
                        ? "bg-green-50 border-green-400"
                        : submitted && !option.is_correct
                        ? "bg-red-50 border-red-400"
                        : "border-gray-300",
                      !submitted && "hover:bg-gray-50"
                    )}
                  >
                    {option.value}
                  </Button>
                ))}
              </div>
            )}
            {subQuestion.type === "fill_blank" && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={subQuestion.answer.answer}
                  onChange={(e) =>
                    dispatch(
                      setAnswer({
                        questionId: subQuestion.id,
                        answer: e.target.value,
                      })
                    )
                  }
                  className={cn(
                    "w-full px-4 py-2 border rounded",
                    submitted &&
                      subQuestion.answer.answer === subQuestion.answer.answer
                      ? "bg-green-50 border-green-400"
                      : submitted &&
                        subQuestion.answer.answer !== subQuestion.answer.answer
                      ? "bg-red-50 border-red-400"
                      : "border-gray-300"
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <div className="text-right mt-4">
        <Button onClick={handleSubmit} className="px-5 py-2 text-white rounded">
          Submit All
        </Button>
      </div>
      {submitted && (
        <div className="mt-4">
          <div className="font-medium text-green-700">
            All pairs matched correctly!
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprehensionQuiz;
