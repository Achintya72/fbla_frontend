import React, { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
// Import your custom Button component
import Button from './button';
import Error from "./Error";
import { X } from '@phosphor-icons/react/dist/ssr';
import Loader from './Loader';

interface PdfUploadModalProps {
  title: string;
  onClose: () => void;
  onSubmit?: (data: { file: File; fileName: string; isOk: boolean }, setError? : Dispatch<SetStateAction<string>>, setLoading? : Dispatch<SetStateAction<boolean>>) => Promise<boolean>;
}

const PdfUploadModal: React.FC<PdfUploadModalProps> = ({ title, onClose, onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isOk, setIsOk] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);


  // Handle file selection and generate a preview URL if it's a PDF
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError('Please upload a PDF file before submitting.');
      return;
    }

    // Build the data object to send to the parent component or process further
    const data = { file, fileName, isOk };

    if (onSubmit) {
        setLoading(true);
      const success = await onSubmit(data, setError, setLoading);
      setLoading(false);

      if (success) {
        onClose();
      }
    }
  };

  if(loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-xl bg-white-200">
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl bg-white-200">
        <div className='flex items-center  mb-4 justify-between'>
          <h4 className="font-bold">{title}</h4>
          <X size={20} onClick={onClose}/>
        </div>
        <form onSubmit={handleSubmit}>
          {/* File Upload Input */}
          <div className="mb-4">
            <label htmlFor="pdf-upload" className="block text-sm font-medium text-gray-700">
              Upload PDF:
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4 file:border-0
                         file:text-sm file:font-semibold file:bg-blue-50
                         file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Preview the PDF if a file is selected */}
          {fileURL && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Preview:</h3>
              <embed src={fileURL} type="application/pdf" className="w-full h-96" />
            </div>
          )}

          {/* Input to name the file */}
          <div className="mb-4">
            <label htmlFor="file-name" className="block text-sm font-medium text-gray-700">
              Name your file:
            </label>
            <input
              id="file-name"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Useless Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              id="is-ok"
              type="checkbox"
              checked={isOk}
              onChange={(e) => setIsOk(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="is-ok" className="ml-2 block text-sm text-gray-700">
              Is this okay?
            </label>
          </div>

          {/* Submit Button using the custom Button component */}
          <div className="flex justify-end">
            <Button type="submit" size="small">
              Submit
            </Button>
          </div>
        </form>
        <Error error={error} resetError={() => setError("")}/>
      </div>
    </div>
  );
};

export default PdfUploadModal;
