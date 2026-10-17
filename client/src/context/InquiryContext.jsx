import React, { createContext, useContext, useState, useCallback } from 'react';

const InquiryContext = createContext(null);

export function InquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialVertical, setInitialVertical] = useState('buy');
  const [propertyContext, setPropertyContext] = useState(null);

  const openInquiry = useCallback((vertical = 'buy', context = null) => {
    setInitialVertical(vertical);
    setPropertyContext(context);
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <InquiryContext.Provider
      value={{
        isOpen,
        initialVertical,
        propertyContext,
        openInquiry,
        closeInquiry,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return ctx;
}
