import { OutputCard } from "@fluentai/react-copilot";
import "./App.css";

import { Textarea } from "@fluentai/textarea";
function App() {
  
  return (
    <div className="root">
      <div className="chat">
        <OutputCard>
          <div>
            <div>
              (Content is not styled) Mona said that Summit Center project is
              set to start pre-construction planning and site preparation for
              the new arena in Atlanta April 2023. The project is set to go into
              the following year.
            </div>
            <br />
            <div>Summit Center Estimated Timeline:</div>
            <ul style={{ marginBottom: 0 }}>
              <li>
                April-June: Pre-construction planning and site preparation
              </li>
              <li>July-September: Construction begins</li>
              <li>October-December: structural work</li>
              <li>
                January - April (Next Year): Completion of finishes and fixtures
              </li>
              <li>
                May - August (Next Year): Commissioning and testing of systems,
                final site work, and obtaining final approvals for the arena.
              </li>
            </ul>
          </div>
        </OutputCard>
      </div>
      <Textarea
        onSubmit={(text) => console.log({ text })}
        placeholder="Ask a question or request, or type '/' for suggestions"
      />
    </div>
  );
}

export default App;
