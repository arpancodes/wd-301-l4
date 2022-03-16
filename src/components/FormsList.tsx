import { navigate } from "raviger";
import React, { useState } from "react";
import { formData } from "./model";
import { getLocalForms } from "./Form";

const saveLocalForms = (formData: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(formData));
};

const FormsList = () => {
  const [localForms, setLocalForms] = useState<formData[]>(() =>
    getLocalForms()
  );

  const deleteForm = (id: number) => {
    const updatedForms = localForms.filter((form) => form.id !== id);
    saveLocalForms(updatedForms);
    setLocalForms(updatedForms);
  };

  return (
    <div>
      <button
        onClick={() => navigate(`/forms/${Number(Date.now())}`)}
        className="bg-blue-600 text-white rounded-lg p-2 m-2"
      >
        New Form
      </button>
      {localForms.map((form) => (
        <div className="border px-2 py-3 flex justify-between" key={form.id}>
          <span>{form.title}</span>
          <div className="flex gap-2">
            <button
              className="text-sm text-blue-500"
              onClick={() => navigate(`/preview/${form.id}/0`)}
            >
              View Form
            </button>
            <button
              className="text-sm text-blue-500"
              onClick={() => navigate(`/forms/${form.id}`)}
            >
              Edit Form
            </button>
            <button
              className="text-sm text-red-500"
              onClick={() => deleteForm(form.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormsList;
