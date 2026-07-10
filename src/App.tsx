// import './App.css';
// import Navbar from './components/navbar';
// import Footer from './components/footer';
// import SurveyCard from './components/surveycard';
// import Question from './components/question';
// import Chart from './components/chart';
// import SurveyForm from './form/surveyform';

// function App() {
//   return (
//     <div className="app">
//       <Navbar />

//       <main className="main-content">
//         <SurveyCard
//           survey={{
//             id: 1,
//             title: "Customer Satisfaction Survey",
//             description:
//               "We value your feedback! Please take a few minutes to complete our customer satisfaction survey.",
//             category: "Customer Feedback",
//           }}
//         />

//         <Question
//           question="How satisfied are you with our service?"
//           options={[
//             "Very Satisfied",
//             "Satisfied",
//             "Neutral",
//             "Dissatisfied",
//             "Very Dissatisfied",
//           ]}
//           onAnswer={(answer) => console.log(answer)}
//         />

//         <Chart
//           data={[
//             { name: "Option A", value: 30 },
//             { name: "Option B", value: 70 },
//           ]} />
//           <SurveyForm onClose={() => console.log("Survey form closed")}
//         />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SurveyCard from "./components/surveycard";
import Question from "./components/question";
import Chart from "./components/chart";
import SurveyForm from "./form/surveyform";
import { supabase } from "./utils/supabase";

type Todo = {
  id: number;
  name: string;
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodos() {
      const { data, error } = await supabase.from("todos").select("id, name");

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      if (data) {
        setTodos(data as Todo[]);
      }
    }

    void getTodos();
  }, []);

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <SurveyCard
          survey={{
            id: 1,
            title: "Customer Satisfaction Survey",
            description:
              "We value your feedback! Please take a few minutes to complete our customer satisfaction survey.",
            category: "Customer Feedback",
          }}
          onTakeSurvey={() => setShowForm(true)}
        />

        <Question
          question="How satisfied are you with our service?"
          options={[
            "Very Satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very Dissatisfied",
          ]}
          onAnswer={(answer: string) => console.log(answer)}
        />

        <Chart
          data={[
            { name: "Option A", value: 30 },
            { name: "Option B", value: 70 },
          ]}
        />

        <section className="supabase-section" aria-label="Supabase todos">
          <h2>Supabase todos</h2>
          {todos.length === 0 ? (
            <p>No todos loaded yet.</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.name}</li>
              ))}
            </ul>
          )}
        </section>

        {showForm && <SurveyForm onClose={() => setShowForm(false)} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
