import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
  profiles?: { full_name: string | null } | null;
}

interface ReviewSectionProps {
  agentId: string;
}

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`text-lg transition-colors ${interactive ? "cursor-pointer" : "cursor-default"} ${
            star <= (hover || rating) ? "text-yellow-400" : "text-muted-foreground/30"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ReviewSection = ({ agentId }: ReviewSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [agentId]);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*, profiles:user_id(full_name)")
      .eq("agent_id", agentId)
      .order("created_at", { ascending: false });
    if (data) setReviews(data as unknown as Review[]);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be logged in to leave a review.", variant: "destructive" });
      return;
    }
    if (newRating === 0) {
      toast({ title: "Select a rating", description: "Please select 1-5 stars.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      agent_id: agentId,
      user_id: user.id,
      rating: newRating,
      comment: newComment.trim() || null,
    });

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already reviewed", description: "You've already reviewed this agent.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Review submitted!", description: "Thanks for your feedback." });
      setNewRating(0);
      setNewComment("");
      fetchReviews();
    }
    setSubmitting(false);
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  return (
    <div>
      <h3 className="font-display font-bold mb-4">Reviews</h3>

      {/* Review Form */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <p className="text-sm font-medium mb-3">Leave a review</p>
        <StarRating rating={newRating} onRate={setNewRating} interactive />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your experience with this agent..."
          className="w-full mt-3 bg-background border border-border rounded-lg p-3 text-foreground text-sm resize-y min-h-[80px] outline-none focus:border-primary placeholder:text-muted-foreground"
          maxLength={1000}
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || newRating === 0}
          className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {/* Reviews List */}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StarRating rating={r.rating} />
                  <span className="text-sm font-medium">
                    {(r.profiles as { full_name: string | null } | null)?.full_name || "Anonymous"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{timeAgo(r.created_at)}</span>
              </div>
              {r.comment && <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
