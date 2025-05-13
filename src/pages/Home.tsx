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
        id: 3,
        type: "fill_blank",
        content: "The capital of India is {{blank_1}}.",
        img_url: "https://flagcdn.com/w320/in.png",
        metadata: null,
      },
      question_answers: [
        {
          question_id: 3,
          answer: ["Delhi"],
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
      question_answers: [
        {
          question_id: 9,
          answer: "Whale",
          format: "text",
        },
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
        {
          question_id: 10,
          value:
            "https://w7.pngwing.com/pngs/572/973/png-transparent-red-triangle-right-triangle-red-triangle-angle-photography-triangle-thumbnail.png",
          is_correct: true,
        },
        {
          question_id: 10,
          value:
            "https://www.shutterstock.com/image-vector/rectangular-square-shape-260nw-1112551052.jpg",
          is_correct: false,
        },
      ],
      question_answers: [
        {
          question_id: 10,
          answer:
            "https://w7.pngwing.com/pngs/572/973/png-transparent-red-triangle-right-triangle-red-triangle-angle-photography-triangle-thumbnail.png",
          format: "text",
        },
      ],
    },
    {
      questions: {
        id: 11,
        type: "comprehension",
        passage: "Once upon a time, a lion was sleeping...",
        sub_questions: [
          {
            id: 1,
            type: "mcq",
            content: "Why was the lion angry?",
            options: [
              { value: "Because he was hungry", is_correct: true },
              { value: "Because he was tired", is_correct: false },
            ],
            answer: {
              answer: "Because he was hungry",
              format: "text",
            },
          },
          {
            id: 2,
            type: "fill_blank",
            content: "The mouse promised to {{blank_1}} the lion.",
            answer: {
              answer: "help",
              format: "text",
            },
          },
        ],
      },
    },
    {
      questions: {
        id: 12,
        type: "fill_blank",
        content: "There are {{blank_1}} fish in Tank B.",
        img_url: "https://pitaya.com.sg/media/2022/1008/41566.png",
        metadata: null,
      },
      question_answers: [
        {
          question_id: 10,
          answer: ["5"],
          format: "text",
        },
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
      <div
        className=""
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-psd/gradient-waves-border-design_23-2150756123.jpg')",
          // backgroundSize: "contain",
          backgroundRepeat: "repeat-x",
        }}
      >
        <div
          className=" p-5 w-[900px] justify-center align-center m-auto"
          style={{
            backgroundImage: "url('../assets/images/top-Photoroom.png')",
            // backgroundSize: "contain",
            backgroundRepeat: "repeat-x",
          }}
        >
          <Quiz data={QuestionArray} />
        </div>
      </div>
    </>
  );
}
