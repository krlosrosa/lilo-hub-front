"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/presentation/shared/components/ui/button";
import { Progress } from "@/presentation/shared/components/ui/progress";
import { ArrowLeft, Zap, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shared/components/ui/dialog";
import { useGame } from "../../jogo-da-memoria/context/game-contexto";
import { QUIZ_QUESTIONS, QuizQuestion } from "../../jogo-da-memoria/data/constants";

const TIMER_SECONDS = 10;

/** Embaralha as perguntas */
function shuffleQuestions(): QuizQuestion[] {
  const arr = [...QUIZ_QUESTIONS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PerguntaRelampagoView = () => {
  const router = useRouter();
  const { addQuizScore } = useGame();

  const [questions] = useState(shuffleQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [totalRoundScore, setTotalRoundScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = questions[currentIndex];
  const isCorrect = selectedOption === question?.correctIndex;

  // Timer countdown
  useEffect(() => {
    if (answered || finished) return;
    setTimeout(() => {
      setTimeLeft(TIMER_SECONDS);
    }, 0);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Time's up
          clearInterval(timerRef.current!);
          setAnswered(true);
          setSelectedOption(-1); // mark timeout
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, finished, answered]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (answered) return;
      if (timerRef.current) clearInterval(timerRef.current);
      setSelectedOption(optionIndex);
      setAnswered(true);

      const elapsed = TIMER_SECONDS - timeLeft;
      let points = 0;
      if (optionIndex === question.correctIndex) {
        if (elapsed <= 3) points = 20;
        else if (elapsed <= 6) points = 15;
        else points = 10;
      }
      setRoundScore(points);
      setTotalRoundScore((p) => p + points);
      addQuizScore(points);
    },
    [answered, timeLeft, question, addQuizScore]
  );

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setAnswered(false);
    setRoundScore(0);
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setRoundScore(0);
    setTotalRoundScore(0);
    setFinished(false);
  };

  const getOptionStyle = (idx: number) => {
    if (!answered) return "bg-card border-border hover:border-primary/50";
    if (idx === question.correctIndex) return "bg-success/10 border-success text-success";
    if (idx === selectedOption && !isCorrect) return "bg-destructive/10 border-destructive text-destructive animate-shake";
    return "bg-card border-border opacity-50";
  };

  if (finished) {
    return (
      <Dialog open onOpenChange={() => {}}>
        <DialogContent className="max-w-xs mx-auto rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">⚡ Quiz Completo!</DialogTitle>
            <DialogDescription>Você respondeu todas as perguntas!</DialogDescription>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">Pontuação Total</p>
            <p className="text-4xl font-black text-primary">{totalRoundScore}</p>
          </div>
          <div className="space-y-2">
            <Button onClick={restart} className="w-full h-12 text-base">Jogar Novamente</Button>
            <Button variant="outline" onClick={() => router.push("/")} className="w-full h-12 text-base">Voltar ao Início</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => router.push("/")} className="p-2 hover-scale">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground flex items-center gap-1">
          <Zap className="w-5 h-5 text-secondary" /> Pergunta Relâmpago
        </h1>
        <span className="text-sm font-semibold text-primary">{totalRoundScore} pts</span>
      </div>

      {/* Progress */}
      <div className="mb-2">
        <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1 text-center">
          Pergunta {currentIndex + 1} de {questions.length}
        </p>
      </div>

      {/* Timer bar */}
      <div className="mb-6">
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{
              width: `${(timeLeft / TIMER_SECONDS) * 100}%`,
              backgroundColor: timeLeft <= 3 ? "hsl(var(--destructive))" : timeLeft <= 6 ? "hsl(var(--accent))" : "hsl(var(--success))",
            }}
          />
        </div>
        <p className="text-center text-sm font-bold mt-1 text-foreground">{timeLeft}s</p>
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl border border-border shadow-md p-5 mb-6 animate-fade-in">
        <p className="text-base font-semibold text-foreground leading-snug">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={answered}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all text-sm flex items-center gap-3 hover-scale ${getOptionStyle(idx)}`}
          >
            <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="flex-1">{opt}</span>
            {answered && idx === question.correctIndex && <CheckCircle2 className="w-5 h-5 text-success shrink-0" />}
            {answered && idx === selectedOption && !isCorrect && idx !== question.correctIndex && (
              <XCircle className="w-5 h-5 text-destructive shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Feedback + Next */}
      {answered && (
        <div className="mt-4 animate-fade-in">
          {selectedOption === -1 ? (
            <p className="text-center text-destructive font-semibold mb-3">⏰ Tempo esgotado!</p>
          ) : isCorrect ? (
            <p className="text-center text-success font-semibold mb-3">✅ Correto! +{roundScore} pontos</p>
          ) : (
            <p className="text-center text-destructive font-semibold mb-3">❌ Errado! 0 pontos</p>
          )}
          <Button onClick={nextQuestion} className="w-full h-12 text-base">
            {currentIndex + 1 >= questions.length ? "Ver Resultado" : "Próxima Pergunta"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PerguntaRelampagoView;
