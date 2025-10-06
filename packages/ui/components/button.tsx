import React from 'react';

export const Button = (p: any) => (
  <button {...p} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
    {p.children}
  </button>
);
