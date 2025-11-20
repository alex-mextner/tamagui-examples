import CanvasPreview from '../../../app/__canvas_preview__';

export default function TestPreviewPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <div style={{ padding: '20px' }}>Preview not available in production</div>;
  }

  return <CanvasPreview />;
}