import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setStatus("No file selected.");
      return;
    }

    setFile(selectedFile);
    setStatus(`Selected file: ${selectedFile.name}`);
  };

  const askQuestion = async () => {

    if (!file) {
      setStatus("Please upload a PDF first.");
      return;
    }

    if (!question.trim()) {
      setStatus("Please enter a question.");
      return;
    }

    setStatus("Generating answer...");
    setAnswer("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      setAnswer(
        `You entered this question: ${data.question}`
      );

      setStatus("Done!");

    } catch (error) {

      console.error(error);

      setAnswer("Unable to connect to backend.");
      setStatus("Backend connection error.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>

      <h1>📚 AskMyNotes</h1>

      <h2>Upload Your Notes</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <p>{status}</p>

      <h2>Ask a Question</h2>

      <textarea
        rows="5"
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button onClick={askQuestion}>
        Ask My Notes
      </button>

      <h2>Answer</h2>

      <p>{answer}</p>

    </div>
  );
}

export default App;