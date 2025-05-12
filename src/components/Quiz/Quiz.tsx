// components/Quiz.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store/store";
import { loadQuestions, submitAll } from "@/store/features/quiz/quizSlice";

import { FillBlankQuiz } from "@/components/QuestionsCompoment/FillBlankQuiz";
import { TrueFalseQuestion } from "@/components/QuestionsCompoment/TrueFalseQuiz";

import { RearrangeClickQuestion } from "../QuestionsCompoment/RearrangeClickQuestion";
import { LinkingQuestion } from "../QuestionsCompoment/LinkingQuestion";
import MCQQuestion from "../QuestionsCompoment/MCQQuestion";

interface QuizProps {
  data: any[];
}

const Quiz: React.FC<QuizProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, score } = useSelector((s: RootState) => s.quiz);

  // load whenever `data` changes
  useEffect(() => {
    dispatch(loadQuestions(data));
  }, [data, dispatch]);

  return (
    <div className="space-y-8">
      {questions.map((q, idx) => (
        <div key={q.questions.id}>
          <h3 className="text-xl font-bold mb-2">Question {idx + 1}</h3>

          {/* pick your UI by type */}
          {(() => {
            switch (q.questions.type) {
              case "fill_blank":
                return <FillBlankQuiz key={q.questions.id} question={q} />;
              case "true_false":
                return <TrueFalseQuestion key={q.questions.id} question={q} />;
              case "rearrange":
                return (
                  <RearrangeClickQuestion key={q.questions.id} question={q} />
                );
              case "linking":
                return <LinkingQuestion key={q.questions.id} question={q} />;
              case "mcq":
                return <MCQQuestion key={q.questions.id} question={q} />;
              default:
                return null;
            }
          })()}
        </div>
      ))}

      <button
        onClick={() => dispatch(submitAll())}
        className="mt-6 px-4 py-2 border-amber-900 border rounded text-amber-900"
      >
        Submit All
      </button>
      {score !== null && (
        <div className="mt-4 text-lg font-semibold">
          Your score: {score} / {questions.length}
        </div>
      )}
    </div>
  );
};

export default Quiz;
