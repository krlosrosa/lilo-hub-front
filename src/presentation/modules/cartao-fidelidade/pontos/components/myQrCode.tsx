import { userProfile, STORE_NAME } from "../data/mock";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";

interface MyQrCodeModalProps {
  open: boolean;
  onClose: () => void;
}

const MyQrCodeModal = ({ open, onClose }: MyQrCodeModalProps) => {
  if (!open) return null;

  const qrValue = JSON.stringify({
    type: "earn_points",
    userId: "usr_marina_001",
    name: userProfile.name,
    store: STORE_NAME,
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-scale-in" onClick={onClose}>
      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl bg-card p-6 shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Meu QR Code</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Apresente ao caixa para ganhar pontos
          </p>

          <div className="mt-5 inline-flex rounded-2xl border-4 border-primary/20 bg-card p-4">
            <QRCodeSVG
              value={qrValue}
              size={200}
              level="M"
              fgColor="hsl(220, 20%, 14%)"
              bgColor="transparent"
            />
          </div>

          <div className="mt-4 rounded-xl bg-gold-light p-3">
            <p className="text-xs font-medium text-muted-foreground">Código do cliente</p>
            <p className="mt-0.5 font-mono text-lg font-bold text-foreground tracking-wider">
              USR-MARINA-001
            </p>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {STORE_NAME} • {userProfile.points} pontos
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyQrCodeModal;
