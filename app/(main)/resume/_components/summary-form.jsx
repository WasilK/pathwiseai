"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { summarySchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Loader2, Save } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

export default function SummaryForm({ summary, onChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: summary || "",
    },
  });

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("summary", improvedContent);
      toast.success("Summary improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve summary");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const handleImproveSummary = async () => {
    const currentSummary = watch("summary");
    if (!currentSummary) {
      toast.error("Please enter a summary first");
      return;
    }

    await improveWithAIFn({
      current: currentSummary,
      type: "Summary",
    });
  };

  const handleSaveSummary = (data) => {
    onChange(data.summary);
    toast.success("Summary saved!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          className="h-40"
          placeholder="Write your professional summary..."
          {...register("summary")}
        />
        {errors.summary && (
          <p className="text-sm text-red-500">{errors.summary.message}</p>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleImproveSummary}
          disabled={isImproving || !watch("summary")}
        >
          {isImproving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Improving...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Improve with AI
            </>
          )}
        </Button>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit(handleSaveSummary)}>
          <Save className="h-4 w-4 mr-2" />
          Save Summary
        </Button>
      </CardFooter>
    </Card>
  );
}
