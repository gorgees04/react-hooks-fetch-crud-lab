import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  console.log(questions);
  // display data
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  // add a new question
  const handleAddNewQuestion = (newQuestion) => {
    setQuestions((prev) => [...prev, newQuestion]);
  };

  // delete question
  const handleDeleteQuestion = (id) => {
    const deletedquestion = questions.filter((question) => question.id !== id);
    setQuestions(deletedquestion);
  };

  // update answer
  const handleUpdateAnswer = (updateAnswer) => {
    const updatedData = questions.map((question) => {
      if (updateAnswer.id === question.id) {
        return updateAnswer;
      } else {
        return question;
      }
    });
    setQuestions(updatedData);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddNewQuestion={handleAddNewQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateAnswer={handleUpdateAnswer}
        />
      )}
    </main>
  );
}

export default App;
