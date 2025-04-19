// src/components/Common/ErrorBoundary.jsx
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('DataTable Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <h3 className="text-red-800 font-medium">Table Failed to Load</h3>
          <p className="text-red-700 text-sm mt-1">
            Please refresh the page or try again later
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}