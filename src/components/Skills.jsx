import React from "react";
import { stackIcons } from "../utils/stackIcons";

export default function Skills({ skills }) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {skills.map((skill) => {
        const Icon = stackIcons[skill] || null;
        return (
          <div
            key={skill}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow-sm"
          >
            {Icon && <Icon className="text-xl text-blue-500" />}
            <span className="font-medium text-gray-700">{skill}</span>
          </div>
        );
      })}
    </div>
  );
}
