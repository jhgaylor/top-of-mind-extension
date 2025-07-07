import React, { useState } from 'react';

interface QuickActionScreenProps {}

function QuickActionScreen({}: QuickActionScreenProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  
  const actions = [
    { id: 1, label: 'Save', icon: '💾', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 2, label: 'Note', icon: '📝', color: 'bg-green-500 hover:bg-green-600' },
    { id: 3, label: 'Remind', icon: '⏰', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { id: 4, label: 'Tag', icon: '🏷️', color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  const handleActionClick = (action: typeof actions[0]) => {
    console.log(`Action clicked: ${action.label}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0" onClick={() => isOpen && setIsOpen(false)}>
      {/* Secondary action buttons */}
      <div className="fixed bottom-20 right-8">
        {actions.map((action, index) => (
          <button
            key={action.id}
            className={`absolute bottom-0 right-0 w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 ${action.color} ${
              isOpen
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-0 pointer-events-none'
            }`}
            style={{
              transform: isOpen
                ? `translateY(-${(index + 1) * 60}px)`
                : 'translateY(0)',
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick(action);
            }}
            title={action.label}
          >
            <span className="text-xl">{action.icon}</span>
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'rotate-45' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}

export default QuickActionScreen;