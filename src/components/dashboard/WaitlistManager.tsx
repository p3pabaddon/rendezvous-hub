import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Trash2, 
  Send, 
  Calendar,
  Clock,
  MoreVertical,
  UserPlus
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface WaitlistManagerProps {
  businessId: string;
}

export function WaitlistManager({ businessId }: WaitlistManagerProps) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWaitlist = async () => {
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .eq("business_id", businessId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setEntries(data || []);
    } catch (err: any) {
      console.error("Error loading waitlist:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (businessId) loadWaitlist();
  }, [businessId]);

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("waitlist").delete().eq("id", id);
    if (error) {
      toast.error("Silinemedi");
    } else {
      toast.success("Kayıt silindi");
      loadWaitlist();
    }
  };

  const notifyEntry = async (id: string) => {
    // Simulation - in production this would send email/sms
    toast.success("Bildirim gönderildi (Simülasyon)");
    await deleteEntry(id);
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Yükleniyor...</div>;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading text-foreground">Bekleme Listesi</h3>
            <p className="text-xs text-muted-foreground">{entries.length} kişi bekliyor</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={loadWaitlist}>Yenile</Button>
      </div>

      <div className="divide-y divide-border">
        {entries.map((entry, index) => (
          <div key={entry.id} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/5 rounded-full flex items-center justify-center font-bold text-accent border border-accent/10">
                {index + 1}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground text-sm">Kullanıcı #{entry.user_id?.slice(0, 8)}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {format(new Date(entry.desired_date), "d MMMM yyyy", { locale: tr })}
                  </span>
                  {entry.desired_time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {entry.desired_time}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right mr-4 hidden sm:block">
                <p className="text-[10px] text-muted-foreground uppercase font-medium">Kayıt Tarihi</p>
                <p className="text-xs font-medium text-foreground">
                  {format(new Date(entry.created_at), "d MMMM, HH:mm", { locale: tr })}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => notifyEntry(entry.id)} className="gap-2">
                    <Send className="w-4 h-4 text-primary" /> Haber Ver
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <UserPlus className="w-4 h-4 text-accent" /> Randevuya Dönüştür
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteEntry(entry.id)} className="gap-2 text-destructive">
                    <Trash2 className="w-4 h-4" /> Listeden Kaldır
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground opacity-30" />
            </div>
            <p className="text-muted-foreground font-medium">Şu an bekleme listesinde kimse yok.</p>
            <p className="text-xs text-muted-foreground mt-1">Müşteriler yer kalmadığında listeye katılabilir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
