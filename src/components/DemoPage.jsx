import React from "react";

function DemoPage() {
  return (
    <div className="flex justify-center items-center h-full dark:bg-surface-a0">
      <div className="p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-xl dark:text-gray-100 font-semibold mb-4">
          Demo Page
        </h1>
        <p className="text-lg text-gray-700">
          This page is for Demonstration Purpose.
        </p>
      </div>
    </div>
  );
}

export default DemoPage;
