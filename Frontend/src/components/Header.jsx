import React from "react";

function Header() {
  return (
    <header class="flex items-center justify-between px-6 py-4 bg-white shadow-md font-mainFont">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.172 3.172a4 4 0 015.656 0L12 6.343l3.172-3.171a4 4 0 115.656 5.656l-8.49 8.49a.5.5 0 01-.707 0l-8.49-8.49a4 4 0 010-5.656z"
            ></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800">CareSync</h1>
      </div>

      <nav class="space-x-4 text-md font-medium">
        <a href="#" class="text-gray-700 hover:text-blue-500">
          Home
        </a>
        <a href="#" class="text-gray-700 hover:text-blue-500">
          Services
        </a>
        <a href="#" class="text-gray-700 hover:text-blue-500">
          Dashboard
        </a>
        <a href="#" class="text-gray-700 hover:text-blue-500">
          Contact
        </a>
      </nav>

      <div>
        <button class="text-white bg-sky-500 hover:bg-sky-600 border-blue-500 border-2 py-2 px-4 rounded-full transition-all duration-200 ease-in-out">
          Login/SignUp
        </button>
      </div>
    </header>
  );
}

export default Header;
