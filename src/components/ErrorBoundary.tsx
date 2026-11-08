import { Component, type ErrorInfo, type ReactNode } from "react";
import { logError } from "../errors";

interface ErrorBoundaryProps {
  // Shown instead of the children once they throw while rendering
  fallback: ReactNode;
  // When this changes (e.g. the URL) the boundary tries the children again
  resetKey?: unknown;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Contains a render error to the block that caused it: the rest of the page
// keeps working instead of being replaced by the error page
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logError(error, `render error${info.componentStack ?? ""}`);
  }

  componentDidUpdate(prev: ErrorBoundaryProps) {
    if (this.state.hasError && prev.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default ErrorBoundary;
