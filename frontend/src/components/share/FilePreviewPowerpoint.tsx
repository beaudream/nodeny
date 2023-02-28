import { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer';

const FilePreviewPowerpoint = ({
  shareId,
  fileId,
}: {
  shareId: string;
  fileId: string;
}) => {
  const url = `${location.origin}/api/shares/${shareId}/files/${fileId}`;
  const pptxViewer: any = useRef(null);
  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/webviewer/lib',
          initialDoc: url,
        },
        pptxViewer.current
      ).then((instance) => {
        // you can now call WebViewer APIs here...
        
      });
    });
  }, []);
  
  return (
    <div className='MyComponent'>
      <div className='webviewer' ref={pptxViewer} style={{ height: '100vh' }}></div>
    </div>
  );
};

export default FilePreviewPowerpoint;
