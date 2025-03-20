"use client";

import React, { useState } from "react";

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("Send Message");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { fullName, email, phoneNumber, subject, message };
    console.log(formData);

    setResult("Sending message...");
    setLoading(true);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body: JSON.stringify(formData), // Convert object to JSON string
    });

    const data = await response.json();

    if (data.success) {
      setStatus("success");
      setResult("Form Submitted Successfully");
      setTimeout(() => {
        setResult("Send Message");
        setStatus("");
        setLoading(false);
      }, 5000);
      setEmail("");
      setFullName("");
      setMessage("");
      setPhoneNumber("");
      setSubject("");
    } else {
      console.log("Error", data);
      setResult("Couldn't send mail");
      setStatus("error");
      setTimeout(() => {
        setResult("Send Message");
        setStatus("");
        setLoading(false);
      }, 5000);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {/* name */}
      <div className="">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          className="input-style"
          required
        />
      </div>

      {/* email and phone number */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {/* email */}
        <div className="">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="input-style"
            required
          />
        </div>
        {/* phone */}
        <div className="">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Your phone number"
            className="input-style"
          />
        </div>
      </div>

      {/* subject */}
      <div className="">
        <input
          type="text"
          placeholder="Subject"
          className="input-style"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* message */}
      <div className="">
        <textarea
          name=""
          id=""
          className="input-style"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={10}
          required
        ></textarea>
      </div>

      {/* submit */}
      <div className="">
        <button
          disabled={loading}
          className={` text-white rounded-[50px] px-12 py-4 cursor-pointer transition-transform  active:scale-100 disabled:scale-100 ${
            loading ? "" : "hover:scale-105"
          } ${
            status === "success"
              ? "bg-green-700"
              : status === "error"
              ? "bg-red-700"
              : "bg-local-primary"
          }`}
        >
          {result}
        </button>
      </div>
    </form>
  );
};

export default Form;
