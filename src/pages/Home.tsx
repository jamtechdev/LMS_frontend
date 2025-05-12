import Navbar from "@/components/Navbar/Navbar";
import Quiz from "@/components/Quiz/Quiz";

export default function Home() {
  const QuestionArray = [
    {
      questions: {
        id: 1,
        type: "fill_blank",
        content: "Water boils at {{blank_1}}°C and freezes at {{blank_2}}°C.",
        metadata: null,
      },
      question_answers: [
        {
          question_id: 1,
          answer: ["100", "0"],
          format: "text",
        },
      ],
    },
    {
      questions: {
        id: 2,
        type: "fill_blank",
        content: "The capital of France is {{blank_1}}.",
        metadata: null,
      },
      question_answers: [
        {
          question_id: 2,
          answer: ["Paris"],
          format: "text",
        },
      ],
    },
    {
      questions: {
        id: 4,
        type: "rearrange",
        content: "Rearrange to form a sentence.",
        metadata: null,
      },
      question_options: [
        { question_id: 4, value: "go", is_correct: false },
        { question_id: 4, value: "Let's", is_correct: false },
        { question_id: 4, value: "to", is_correct: false },
        { question_id: 4, value: "school", is_correct: false },
      ],
      question_answers: [
        {
          question_id: 4,
          answer: ["Let's", "go", "to", "school"],
          format: "ordered",
        },
      ],
    },
    {
      questions: {
        id: 5,
        type: "linking",
        content: "Match the animals to their sounds.",
        metadata: null,
      },
      question_options: [
        { question_id: 5, label: "A1", value: "Dog" },
        { question_id: 5, label: "B1", value: "Bark" },
        { question_id: 5, label: "A2", value: "Cat" },
        { question_id: 5, label: "B2", value: "Meow" },
      ],
      question_answers: [
        {
          question_id: 5,
          answer: [
            {
              left: {
                image_uri: "",
                word: "Cat",
                type: "word",
              },
              right: {
                image_uri: "",
                word: "soft, small, furry",
                type: "word",
              },
            },
            {
              left: {
                image_uri: "",
                word: "Car",
                type: "word",
              },
              right: {
                image_uri: "",
                word: "fast, shiny, loud",
                type: "word",
              },
            },
            {
              left: {
                word: "Chair",
                type: "word",
                image_uri: "",
              },
              right: {
                word: "wooden, four legs, seat",
                type: "word",
                image_uri: "",
              },
            },
          ],
          format: "mapping",
        },
      ],
    },
    {
      questions: {
        id: 6,
        type: "true_false",
        content: "The sun rises in the west. Explain your answer.",
        metadata: null,
      },
      question_options: [
        { question_id: 6, value: "True" },
        { question_id: 6, value: "False" },
      ],
      question_answers: [
        {
          question_id: 6,
          answer: {
            choice: "False",
            explanation: "The sun rises in the east.",
          },
          format: "text",
        },
      ],
    },
    {
      questions: {
        id: 9,
        type: "mcq",
        content: "Which of the following is a mammal?",
        metadata: { ui: "circle" },
      },
      question_options: [
        { question_id: 9, value: "Shark", is_correct: false },
        { question_id: 9, value: "Whale", is_correct: true },
        { question_id: 9, value: "Frog", is_correct: false },
      ],
    },
    {
      questions: {
        id: 10,
        type: "image_mcq",
        content: "Select the image that shows a triangle.",
        metadata: null,
      },
      question_options: [
        { question_id: 10, value: "url_to_triangle.jpg", is_correct: true },
        { question_id: 10, value: "url_to_square.jpg", is_correct: false },
      ],
    },
  ];

  return (
    <>
      <Navbar
        name="My LMS"
        homeUrl="/"
        actions={[
          { text: "Login", href: "/login" },
          {
            text: "Sign up",
            href: "/signup",
            isButton: true,
          },
        ]}
        mobileLinks={[
          { text: "Login", href: "/login" },
          { text: "Sign up", href: "/signup" },
        ]}
        showNavigation={false}
      />
      <div className="mt-10 p-5">
        <Quiz data={QuestionArray} />
      </div>
    </>
  );
}
