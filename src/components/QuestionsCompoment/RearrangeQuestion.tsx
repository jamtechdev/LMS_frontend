// components/QuestionsCompoment/RearrangeQuestion.tsx
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "@/store/features/quiz/quizSlice";
import type { Question } from "@/store/features/quiz/quizSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  value: string;
}

interface Props {
  question: Question;
}

const RearrangeQuestion: React.FC<Props> = ({ question }) => {
  if (
    question.questions.type !== "rearrange" ||
    !question.question_options ||
    !question.question_answers
  ) {
    return null;
  }

  const dispatch = useDispatch<AppDispatch>();
  const qid = question.questions.id;

  // the correct target sequence
  const correctOrder = question.question_answers[0].answer as string[];

  // any previously‐saved order in Redux
  const reduxOrder = useSelector(
    (s: RootState) => (s.quiz.answers[qid] as string[]) || []
  );

  // helper to wrap values with stable IDs
  const buildItems = (values: string[]) =>
    values.map((val) => ({
      id: `${qid}-${val}-${uuidv4()}`,
      value: val,
    }));

  // local drag state
  const [items, setItems] = useState<Item[]>(
    reduxOrder.length > 0
      ? buildItems(reduxOrder)
      : buildItems(question.question_options.map((opt) => opt.value))
  );

  // initialize Redux if empty
  useEffect(() => {
    if (!reduxOrder.length) {
      dispatch(
        setAnswer({
          questionId: qid,
          answer: items.map((it) => it.value),
        })
      );
    }
  }, []);

  // on drag end, reorder & sync to Redux
  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;
    const copy = Array.from(items);
    const [moved] = copy.splice(res.source.index, 1);
    copy.splice(res.destination.index, 0, moved);
    setItems(copy);
    dispatch(
      setAnswer({
        questionId: qid,
        answer: copy.map((it) => it.value),
      })
    );
  };

  // grading results from Redux (if submitAll has run)
  const result = useSelector((s: RootState) => s.quiz.results[qid] || []);
  const fullyCorrect =
    result.length === correctOrder.length && result.every((b) => b);

  return (
    <div
      className={cn(
        "p-4 rounded-md border",
        result.length === 0
          ? "border-gray-200"
          : fullyCorrect
          ? "border-green-500 bg-green-50"
          : "border-red-500 bg-red-50"
      )}
    >
      <div className="font-semibold mb-4">{question.questions.content}</div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={`droppable-${qid}`}
          direction="horizontal"
          isDropDisabled={false}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-wrap gap-2 mb-4"
            >
              {items.map((item, idx) => {
                const inPlace = item.value === correctOrder[idx];

                return (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={idx}
                    isDragDisabled={false}
                  >
                    {(prov, snap) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className={cn(
                          "px-4 py-2 border rounded-lg",
                          // while dragging, show the drag style
                          snap.isDragging
                            ? "bg-blue-50 border-blue-300"
                            : // otherwise, if in correct place → green
                            inPlace
                            ? "bg-green-50 border-green-500"
                            : // default look
                              "bg-white border-gray-200"
                        )}
                      >
                        {item.value}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {result.length > 0 && (
        <div className="font-medium">
          {fullyCorrect ? (
            <span className="text-green-700">✅ Correct!</span>
          ) : (
            <span className="text-red-700">❌ Incorrect.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default RearrangeQuestion;
