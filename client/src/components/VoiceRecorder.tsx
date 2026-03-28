import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2, CheckCircle2 } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscriptComplete: (transcript: string) => void;
}

export const VoiceRecorder = ({ onTranscriptComplete }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    // Simulated speech recognition beginning
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate API processing delay
    setTimeout(() => {
      const mockTranscripts = [
        "Today I bought 3 crates of tomatoes for 280 cedis and sold 2 for 200.",
        "Sold all my plantains for 450 cedis. Paid 50 for transportation.",
        "Bought 5 bags of onions. Price is higher today, 120 per bag."
      ];
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      setTranscript(randomTranscript);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSave = () => {
    onTranscriptComplete(transcript);
    setTranscript('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
      <div className="flex flex-col items-center gap-6 text-center">
        {!transcript && !isProcessing && (
          <>
            <div className={`relative flex items-center justify-center`}>
              {isRecording && (
                <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping" />
              )}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                  ? 'bg-red-500 scale-110 shadow-lg shadow-red-200' 
                  : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200'
                }`}
              >
                {isRecording ? (
                  <Square className="w-10 h-10 text-white fill-current" />
                ) : (
                  <Mic className="w-10 h-10 text-white" />
                )}
              </button>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900">
                {isRecording ? 'Listening...' : 'Record Transaction'}
              </h3>
              <p className="text-slate-500 mt-1">
                {isRecording ? formatTime(timer) : 'Tap the mic and speak'}
              </p>
            </div>
          </>
        )}

        {isProcessing && (
          <div className="py-8 flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            <p className="text-slate-600 font-medium">Processing your voice...</p>
          </div>
        )}

        {transcript && !isProcessing && (
          <div className="w-full animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Transcript</p>
              <p className="text-slate-800 leading-relaxed italic">"{transcript}"</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setTranscript('')} 
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 py-3 px-4 rounded-xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Save Entry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
