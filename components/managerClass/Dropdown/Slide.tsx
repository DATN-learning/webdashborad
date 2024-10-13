import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer: React.FC = () => {
    const [pdfData, setPdfData] = useState<string | null>(null);

    // Initialize the default layout plugin
    const defaultLayout = defaultLayoutPlugin();

    const onFileLoad = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && e.target.result) {
                    setPdfData(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <input type="file" accept=".pdf" onChange={onFileLoad} />

            {pdfData && (
                <div style={{ height: '750px' }}>
                    {/* Use the Worker component to provide the correct worker URL */}
                    <Worker workerUrl="/pdf.worker.min.js">
                        <Viewer fileUrl={pdfData} plugins={[defaultLayout]} />
                    </Worker>
                </div>
            )}
        </>
    );
};

export default PDFViewer;
