import { notifications } from "../data/mock";
import { Bell, X } from "lucide-react";
import { useState } from "react";

const NotificationBanner = () => {
  const [visible, setVisible] = useState(true);
  const latest = notifications[0];

  if (!visible || !latest) return null;

  return (
    <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-gold-light p-3 animate-slide-up">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-gold text-primary-foreground">
        <Bell className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{latest.message}</p>
        <p className="text-xs text-muted-foreground">{latest.time}</p>
      </div>
      <button onClick={() => setVisible(false)} className="shrink-0 text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NotificationBanner;
