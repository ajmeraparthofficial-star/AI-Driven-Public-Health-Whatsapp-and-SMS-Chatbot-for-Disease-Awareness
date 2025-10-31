
import React from 'react';

interface DisclaimerProps {
  onAccept: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-full text-center">
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-pink-500/30 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-pink-400">Important Information</h2>
        <div className="space-y-4 text-gray-300 text-sm">
            <p>
                Welcome to your AI Health Companion. Before you begin, please read the following:
            </p>
            <ul className="list-disc list-inside text-left space-y-2">
                <li>
                    <span className="font-semibold">Not a Doctor:</span> This is an AI assistant, not a registered medical professional. Information provided is for general awareness and educational purposes only.
                </li>
                <li>
                    <span className="font-semibold">Seek Professional Advice:</span> This tool cannot provide a diagnosis. For any health concerns, diagnosis, or treatment, please consult a qualified doctor.
                </li>
                <li>
                    <span className="font-semibold">Privacy (DISHA Compliance):</span> Your conversation is anonymous. We do not ask for, store, or track any personal information like your name, age, or location.
                </li>
                 <li>
                    <span className="font-semibold">Emergency:</span> If you are experiencing a medical emergency, please contact your local emergency services immediately.
                </li>
            </ul>
             <p className="pt-4">
                By clicking "Accept & Continue", you acknowledge and agree to these terms.
            </p>
        </div>
        <button
          onClick={onAccept}
          className="mt-6 w-full p-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-500 transition-colors"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
};
