"use client";

import React, { useState } from "react";
import axios from "axios";

const Vat = () => {
  const [vatData, setVatData] = useState(null);
  const [vatNumber, setVatNumber] = useState("");
  const [error, setError] = useState(null);

  const fetchVatData = async (e) => {
    e.preventDefault();

    if (!vatNumber) {
      setError("Please enter a VAT number.");
      return;
    }

    setError(null);

    // API URL for fetching VAT details NL810462783B01
    const apiUrl = `https://api.vatcomply.com/vat?vat_number=${vatNumber}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setVatData(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  };

  return (
    <main className="container px-4 py-16 sm:py-24 lg:py-32 max-w-4xl">
      <h1 className="text-2xl md:text-4xl mt-6 md:mt-0 mx-auto text-center mb-2">
        VAT Number Validation
      </h1>
      <p className="max-w-lg mx-auto text-center leading-snug mt-2 md:mt-0">
        You can verify the validity of a VAT number by entering the number to be
        validated.
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={fetchVatData}
        className="w-full max-w-md mx-auto flex-none lg:flex gap-4 mt-10"
      >
        <input
          type="text"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          placeholder="Enter VAT number"
          className="border p-2 border-zinc-950 w-full"
        />

        {/* Button to fetch VAT data */}
        <button
          className="bg-zinc-950 text-white px-6 p-2 mt-2 lg:mt-0 w-full lg:w-[10rem]"
          type="submit"
        >
          Validate
        </button>
      </form>

      {vatData && (
        <div className="mx-auto border-2 border-zinc-950 md:p-10 p-6 mt-10 max-w-3xl grid grid-cols-1 md:grid-cols-2">
          <p className="p-2">
            <strong>Valid:</strong>
          </p>
          <p className="p-2">{vatData.valid ? "Yes" : "No"}</p>
          <p className="p-2">
            <strong>VAT Number:</strong>
          </p>
          <p className="p-2">{vatData.vat_number}</p>
          <p className="p-2">
            <strong>Company Name:</strong>
          </p>
          <p className="p-2">{vatData.name || "N/A"}</p>
          <p className="p-2">
            <strong>Address:</strong>
          </p>
          <p className="p-2">{vatData.address || "N/A"}</p>
          <p className="p-2">
            <strong>Country Code:</strong>
          </p>
          <p>{vatData.country_code}</p>
        </div>
      )}
    </main>
  );
};

export default Vat;
