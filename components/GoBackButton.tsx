'use client';

import { ArrowLeft } from 'lucide-react';

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mt-6 inline-flex items-center gap-2 text-gray-600 hover:text-[#B8941E] transition"
    >
      <ArrowLeft className="w-4 h-4" />
      Go Back
    </button>
  );
}
