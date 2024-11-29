import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InviteMemberFormProps {
  onInvite: (email: string) => void;
}

const InviteMemberForm: React.FC<InviteMemberFormProps> = ({ onInvite }) => {
  const [email, setEmail] = useState('');

  const handleInvite = () => {
    if (email) {
      onInvite(email);
      setEmail('');
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <button
        type="button"
        onClick={handleInvite}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Send className="h-4 w-4 mr-2" />
        Invite
      </button>
    </div>
  );
};

export default InviteMemberForm;