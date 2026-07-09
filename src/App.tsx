// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import Navbar from './components/navbar'
// import footer from './components/footer'
// import Footer from './components/footer'
// import SurveyCard from './components/surveycard'
// import Question from './components/question'
// import Chart from './components/chart'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Navbar/>
//     <Footer/>
//     <SurveyCard survey={{ id: 1, title: "Customer Satisfaction Survey", description: "We value your feedback! Please take a few minutes to complete our customer satisfaction survey.", category: "Customer Feedback" }} />
//     <Question
//       question="How satisfied are you with our service?"
//       options={["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]}
//       onAnswer={(answer) => console.log(answer)}
//     />
//     <Chart data={[{ name: "Option A", value: 30 }, { name: "Option B", value: 70 }]} />
//       {/* <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section> */}
//     </>
//   )
// }

// export default App



import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SurveyCard from './components/surveycard';
import Question from './components/question';
import Chart from './components/chart';

function App() {
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
          onAnswer={(answer) => console.log(answer)}
        />

        <Chart
          data={[
            { name: "Option A", value: 30 },
            { name: "Option B", value: 70 },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;