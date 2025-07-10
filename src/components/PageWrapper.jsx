// src/components/PageWrapper.jsx
export default function PageWrapper({ children }) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 space-y-6 pt-8">
        {children}
      </div>
    );
  }
  