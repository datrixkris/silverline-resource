import React from "react";

const Form = () => {
  return (
    <form className="space-y-4 md:space-y-6">
      {/* name */}
      <div className="">
        <input
          type="text"
          placeholder="Your full name"
          className="input-style"
        />
      </div>

      {/* email and phone number */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {/* email */}
        <div className="">
          <input
            type="email"
            placeholder="Your email"
            className="input-style"
          />
        </div>
        {/* phone */}
        <div className="">
          <input
            type="text"
            placeholder="Your phone number"
            className="input-style"
          />
        </div>
      </div>

      {/* subject */}
      <div className="">
        <input type="text" placeholder="Subject" className="input-style" />
      </div>

      {/* message */}
      <div className="">
        <textarea
          name=""
          id=""
          className="input-style"
          placeholder="Message"
          rows={10}
        ></textarea>
      </div>

      {/* submit */}
      <div className="">
        <button className="bg-primary text-white rounded-[50px] px-12 py-4 cursor-pointer transition-transform hover:scale-105 active:scale-100 disabled:scale-100">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default Form;
