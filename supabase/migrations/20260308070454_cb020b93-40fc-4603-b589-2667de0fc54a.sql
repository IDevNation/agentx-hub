
CREATE OR REPLACE FUNCTION public.update_agent_rating()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE public.agents
    SET rating = COALESCE((SELECT ROUND(AVG(r.rating)::numeric, 1) FROM public.reviews r WHERE r.agent_id = OLD.agent_id), 0),
        review_count = (SELECT COUNT(*) FROM public.reviews r WHERE r.agent_id = OLD.agent_id)
    WHERE id = OLD.agent_id;
    RETURN OLD;
  ELSE
    UPDATE public.agents
    SET rating = COALESCE((SELECT ROUND(AVG(r.rating)::numeric, 1) FROM public.reviews r WHERE r.agent_id = NEW.agent_id), 0),
        review_count = (SELECT COUNT(*) FROM public.reviews r WHERE r.agent_id = NEW.agent_id)
    WHERE id = NEW.agent_id;
    RETURN NEW;
  END IF;
END;
$$;

CREATE TRIGGER on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_agent_rating();
