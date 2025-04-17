document
  .getElementById("user-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserInput();
    }
  });

async function handleUserInput() {
  let userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  displayMessage(userInput, "user-message");
  document.getElementById("user-input").value = "";

  let botMessageElement = displayMessage("", "bot-message");

  try {
    let response = await fetch("http://127.0.0.1:8000/get_response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userInput }),
    });

    let data = await response.json();
    let botResponse = formatResponse(data.response);

    streamResponse(botResponse, botMessageElement);
  } catch (error) {
    console.error("Error fetching response:", error);
    botMessageElement.textContent =
      "Error: Unable to get a response from the server.";
  }
}

function displayMessage(message, messageType) {
  const chatOutput = document.getElementById("chat-output");
  const messageElement = document.createElement("div");
  messageElement.className = "message " + messageType;
  messageElement.innerHTML = message;
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;
  return messageElement;
}

function streamResponse(text, element) {
  let words = text.split(" ");
  let index = 0;

  function addNextWord() {
    if (index < words.length) {
      element.innerHTML += words[index] + " ";
      index++;
      setTimeout(addNextWord, 50);
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

  addNextWord();
}

function formatResponse(response) {
  // Replace **bold text**
  response = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace line breaks
  response = response.replace(/\n/g, "<br>");

  // Format code blocks
  response = response.replace(
    /```python([\s\S]*?)```/g,
    `<div class="code-container"><pre><code class="language-python">$1</code></pre><button class="copy-btn" onclick="copyCode(this)">Copy</button></div>`
  );

  return response;
}
function copyCode(button) {
  const code = button.previousElementSibling.innerText;
  navigator.clipboard.writeText(code).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 2000);
  });
}

function showLessons() {
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("lesson-section").style.display = "block";
}

function showQuiz() {
  document.getElementById("lesson-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
}

// For Variable and data types button
// Variables and Data types
async function getVariableDataTypes() {
  console.log("getVariableDataTypes() called"); // Debug log

  // Show loading message
  const botMessageElement = displayMessage("Loading...", "bot-message");

  try {
    // Fetch response from FastAPI backend
    console.log("Sending request to /Variable_DataTypes...");
    const response = await fetch("http://127.0.0.1:8000/Variable_DataTypes");

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response JSON:", data); // Debug log

    // Ensure the expected key exists
    if (!data.response) {
      throw new Error("Missing 'response' key in returned data");
    }

    // Format and stream response
    const formattedResponse = formatResponse(data.response);
    botMessageElement.innerHTML = "";
    streamResponse(formattedResponse, botMessageElement);
  } catch (error) {
    console.error("Error fetching variable data types:", error);
    botMessageElement.textContent =
      "Error: Unable to get a response from the server.";
  }
}

// For INTRODUCING LIST BUTTON
async function Introducing_list() {
  console.log("Introducing_list() called"); // Debug log

  // Show loading message
  const botMessageElement = displayMessage("Loading...", "bot-message");

  try {
    // Fetch response from FastAPI backend
    console.log("Sending request to /Introducing_list...");
    const response = await fetch("http://127.0.0.1:8000/Introducing_list");

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response JSON:", data); // Debug log

    // Ensure the expected key exists
    if (!data.response) {
      throw new Error("Missing 'response' key in returned data");
    }

    // Format and stream response
    const formattedResponse = formatResponse(data.response);
    botMessageElement.innerHTML = "";
    streamResponse(formattedResponse, botMessageElement);
  } catch (error) {
    console.error("Error fetching Introducing list response:", error);
    botMessageElement.textContent =
      "Error: Unable to get a response from the server.";
  }
}

// for Working_with_Lists
async function Working_with_Lists() {
  console.log("get_working_with_list() called"); // Debug log

  // Show loading message
  const botMessageElement = displayMessage("Loading...", "bot-message");

  try {
    // Fetch response from FastAPI backend
    console.log("Sending request to /get_working_with_list...");
    const response = await fetch("http://127.0.0.1:8000/Working_with_Lists");

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response JSON:", data); // Debug log

    // Ensure the expected key exists
    if (!data.response) {
      throw new Error("Missing 'response' key in returned data");
    }

    // Format and stream response
    const formattedResponse = formatResponse(data.response);
    botMessageElement.innerHTML = "";
    streamResponse(formattedResponse, botMessageElement);
  } catch (error) {
    console.error("Error fetching Working with list response:", error);
    botMessageElement.textContent =
      "Error: Unable to get a response from the server.";
  }
}
