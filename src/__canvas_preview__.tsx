import { sampleRender as BMICalculatorSampleRender } from './components/calculators/BMICalculator';
import { sampleRender as LoanCalculatorSampleRender } from "./../components/calculators/LoanCalculator";
import { sampleRender as TipCalculatorSampleRender } from './components/calculators/TipCalculator';
const sampleRenderMap: Record<string, () => React.ReactNode> = {
  "components/calculators/LoanCalculator.tsx": LoanCalculatorSampleRender,
  'components/calculators/BMICalculator.tsx': BMICalculatorSampleRender,
  'components/calculators/TipCalculator.tsx': TipCalculatorSampleRender
};
const CanvasPreview = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const componentName = urlParams.get('component');
  const renderComponent = sampleRenderMap[componentName || ''];
  if (!renderComponent) {
    return <div>Component not found</div>;
  }
  return renderComponent();
};
export default CanvasPreview;