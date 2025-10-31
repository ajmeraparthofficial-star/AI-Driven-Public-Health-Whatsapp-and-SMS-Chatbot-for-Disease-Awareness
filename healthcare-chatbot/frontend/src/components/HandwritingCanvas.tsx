
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface HandwritingCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (imageData: string) => void;
}

export const HandwritingCanvas: React.FC<HandwritingCanvasProps> = ({ isOpen, onClose, onSend }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      // Adjust for device pixel ratio for sharper drawing
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(dpr, dpr);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        contextRef.current = context;
      }
      clearCanvas();
    }
  }, [isOpen]);
  
  const getCoords = (event: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if (event.nativeEvent instanceof MouseEvent) {
      return { x: event.nativeEvent.clientX - rect.left, y: event.nativeEvent.clientY - rect.top };
    }
    if (event.nativeEvent instanceof TouchEvent) {
      return { x: event.nativeEvent.touches[0].clientX - rect.left, y: event.nativeEvent.touches[0].clientY - rect.top };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!contextRef.current) return;
    const { x, y } = getCoords(event);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  }, []);

  const finishDrawing = useCallback(() => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  }, []);

  const draw = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !contextRef.current) return;
    const { x, y } = getCoords(event);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  }, [isDrawing]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSend = () => {
    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL('image/png');
      onSend(imageData);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-xl border border-pink-500/30 flex flex-col space-y-4 w-11/12 max-w-lg">
        <h3 className="text-lg font-semibold text-pink-400">Write your question</h3>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={draw}
          className="bg-white rounded-md cursor-crosshair w-full h-64"
          style={{ touchAction: 'none' }}
        />
        <div className="flex justify-between space-x-2">
           <button
            onClick={onClose}
            className="w-full p-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={clearCanvas}
            className="w-full p-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSend}
            className="w-full p-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
