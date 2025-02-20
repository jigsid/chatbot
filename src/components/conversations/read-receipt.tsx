import React from 'react';

type ReadReceiptProps = {
  status: 'sent' | 'delivered' | 'read';
};

export const ReadReceipt = ({ status }: ReadReceiptProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'sent': return 'text-gray-400';
      case 'delivered': return 'text-blue-400';
      case 'read': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`text-xs ${getStatusColor()}`}>
      {status}
    </div>
  );
}; 