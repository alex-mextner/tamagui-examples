import React from 'react';

// Component imports will be added automatically

// Sample render map - functions that return JSX
import { sampleRender as LoanCalculatorSampleRender } from "./../components/calculators/LoanCalculator";
import { sampleRender as TipCalculatorSampleRender } from "./../components/calculators/TipCalculator";
import { sampleRender as BMICalculatorSampleRender } from "./../components/calculators/BMICalculator";
const sampleRenderMap: Record<string, () => React.ReactNode> = {
  "components/calculators/LoanCalculator.tsx": LoanCalculatorSampleRender,
  "components/calculators/TipCalculator.tsx": TipCalculatorSampleRender,
  "components/calculators/BMICalculator.tsx": BMICalculatorSampleRender
} // Entries will be added automatically
;
interface CanvasPreviewProps {
  component?: string | null;
}
export default function CanvasPreview({
  component
}: CanvasPreviewProps) {
  // Only available in development
  if (process.env.NODE_ENV !== 'development') {
    return <div style={{
      padding: '20px'
    }}>Preview not available</div>;
  }
  const [componentPath, setComponentPath] = React.useState<string | null>(component || null);
  const [isMounted, setIsMounted] = React.useState(false);

  // Get component from URL on client-side mount
  React.useEffect(() => {
    setIsMounted(true);
    if (!component && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlComponent = params.get('component');
      setComponentPath(urlComponent);
    }
  }, [component]);
  if (!componentPath) {
    // Show loading during SSR and before mount (to prevent hydration mismatch)
    if (!isMounted) {
      return <div style={{
        padding: '20px'
      }}>Loading...</div>;
    }
    // Show error only after mount
    return <div style={{
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
        <h2>Error: No component specified</h2>
        <p>Please provide a component path via ?component= parameter</p>
        <p>Available components: {Object.keys(sampleRenderMap).join(', ')}</p>
      </div>;
  }
  const SampleRender = sampleRenderMap[componentPath];
  if (!SampleRender) {
    return <div style={{
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
        <h2>Error: Component not found</h2>
        <p>Component "{componentPath}" is not available</p>
        <p>Available components: {Object.keys(sampleRenderMap).join(', ')}</p>
      </div>;
  }
  return <div style={{
    padding: '20px'
  }}>
      <SampleRender />
    </div>;
}