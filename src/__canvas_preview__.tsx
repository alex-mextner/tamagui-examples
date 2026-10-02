import { SampleDefault as BMICalculatorSampleRender } from './../components/calculators/BMICalculator';
import { SampleDefault as LoanCalculatorSampleRender } from './../components/calculators/LoanCalculator';
import { SampleDefault as BMICalculatorSampleRender } from './components/calculators/BMICalculator';
import { SampleDefault as TipCalculatorSampleRender } from './components/calculators/TipCalculator';

const SampleDefaultMap: Record<string, React.FC> = {
  'components/calculators/LoanCalculator.tsx': LoanCalculatorSampleRender,
  'components/calculators/BMICalculator.tsx': BMICalculatorSampleRender,
  'components/calculators/TipCalculator.tsx': TipCalculatorSampleRender,
};
const CanvasPreview = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const componentName = urlParams.get('component');
  const renderComponent = SampleDefaultMap[componentName || ''];
  if (!renderComponent) {
    return <div>Component not found</div>;
  }
  return renderComponent();
};
export default CanvasPreview;
