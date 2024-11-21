import { useState } from "react";
import { executeCode } from "../lib/api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <p style={{ marginBottom: "20px", fontSize: "35px", color: 'white' }}>Output</p>
      <button
        onClick={runCode}
        style={{
          padding: "8px 16px",
          marginBottom: "16px",
          border: "1px solid #38A169",
          borderRadius: "4px",
          color: "#38A169",
          cursor: "pointer",
          backgroundColor: isLoading ? "#E2E8F0" : "transparent",
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div
        style={{
          height: "75vh",
          padding: "10px",
          color: isError ? 'white' : "",
          border: "1px solid",
          borderRadius: "4px",
          borderColor: '#38A169',
          overflowY: "auto",
        }}
      >
        {output
          ? output.map((line, i) => <p key={i} style={{color: 'white'}}>{line} </p>)
          :<p style={{color:'white'}}>'Click "Run Code" to see the output here'</p> }
      </div>
    </div>
  );
};

export default Output;