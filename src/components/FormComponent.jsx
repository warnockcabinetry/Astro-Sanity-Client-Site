import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useFormspark } from "@formspark/use-formspark";
import axios from "axios";

const FORMSPARK_FORM_ID = "n6nFdqZtI";

export default function ContactForm() {
  const myRef = useRef(null);
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  console.log("reatt", message, firstName, lastName, email);

  const onSubmit = async (e) => {
    const status = document.getElementById("status");
    e.preventDefault();
    await submit({ message, firstName, lastName, email });

    axios
      .post({
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          message: message,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.status);
        if (response.data.status === 200) {
          console.log("success");
          myRef.current.innerHTML = "Thanks for your email";
          // Google Ads conversion tracking
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          }
        } else {
          console.log("s");
          myRef.current.innerHTML = "Error. Please try again.";
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log("Form submitted");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="form contact-container"
      data-botpoison-public-key="pk_63cf250d-bf36-4970-ac6f-143da67ad4c4"
    >
      <div className="contact-container">
        <input
          id="firstName"
          type="text"
          name="first-name"
          placeholder="first name"
          className="text-input"
          required
          minLength="2"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          name="last-name"
          id="lastName"
          placeholder="last name"
          className="text-input"
          minLength="4"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="text-input"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          name="message"
          placeholder="message"
          id="message"
          className="text-input message-text"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="selector--container">
          <label htmlFor="category" className="cat-selector-label">
            Select Project Category:
          </label>
          <select name="category" className="custom-select" id="category">
            <option value="Kitchens">Kitchens</option>
            <option value="Wardrobes" selected>Wardrobes</option>
            <option value="Built-ins">Built-ins</option>
            <option value="Other">Other</option>
          </select>
          <script dangerouslySetInnerHTML={{__html:`
            document.addEventListener('DOMContentLoaded', function() {
              const params = new URLSearchParams(window.location.search);
              const cat = params.get('category');
              if (cat) {
                const select = document.getElementById('category');
                if (select) select.value = cat;
              }
            });
          `}} />
        </div>
        <button
          type="submit"
          disabled={submitting}
          id="send-button"
          value="Send"
          className="send-button-class"
        >
          Send
        </button>

        <h3 ref={myRef} id="status"></h3>
      </div>
    </form>
  );
}
