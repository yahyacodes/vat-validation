"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">VAT Number Validation</h1>
      <p className="max-w-lg text-center leading-snug">
        You can verify the validity of a VAT number by entering the number to be
        validated.
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={fetchVatData} className="flex gap-4 mt-10">
        <input
          type="text"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          placeholder="Enter VAT number"
          className="input border p-2 border-zinc-950 w-[20rem] max-w-xs"
        />

        {/* Button to fetch VAT data */}
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-zinc-950 text-white px-6 p-1"
          type="submit"
        >
          Validate
        </button>
      </form>

      {vatData && (
        <div className="border-2 border-zinc-950 p-10 mt-10 max-w-3xl grid grid-cols-2">
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
}
