import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSiteSettings, useQuranicVerses } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

interface SettingsForm {
  siteTitle: string;
  siteTagline: string;
  contactEmail: string;
  donationUrl: string;
  featuredVerseId: string;
}

export default function AdminSettings() {
  const { data: settings, isLoading } = useSiteSettings();
  const { data: verses } = useQuranicVerses();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<SettingsForm>({
    defaultValues: {
      siteTitle: "",
      siteTagline: "",
      contactEmail: "",
      donationUrl: "",
      featuredVerseId: "",
    },
  });

  const featuredVerseId = watch("featuredVerseId");

  useEffect(() => {
    if (settings) {
      reset({
        siteTitle: settings.siteTitle || "",
        siteTagline: settings.siteTagline || "",
        contactEmail: settings.contactEmail || "",
        donationUrl: settings.donationUrl || "",
        featuredVerseId: settings.featuredVerseId || "",
      });
    }
  }, [settings, reset]);

  const saveMutation = useMutation({
    mutationFn: (data: SettingsForm) =>
      api.put("/api/admin/settings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["homepage-content"] });
      toast({ title: "Settings saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save settings", variant: "destructive" });
    },
  });

  const onSubmit = (data: SettingsForm) => {
    saveMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
        Site Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 max-w-2xl">
          <Card className="border-border/50 bg-card/60">
            <CardHeader>
              <CardTitle className="text-lg">General</CardTitle>
              <CardDescription>
                Basic site information displayed across the website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  {...register("siteTitle")}
                  placeholder="The Final Hour"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteTagline">Site Tagline</Label>
                <Input
                  id="siteTagline"
                  {...register("siteTagline")}
                  placeholder="Islamic Eschatology - Signs of the Last Day"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/60">
            <CardHeader>
              <CardTitle className="text-lg">Contact & Links</CardTitle>
              <CardDescription>
                Contact information and external links.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail")}
                  placeholder="contact@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donationUrl">Donation URL</Label>
                <Input
                  id="donationUrl"
                  {...register("donationUrl")}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/60">
            <CardHeader>
              <CardTitle className="text-lg">Featured Content</CardTitle>
              <CardDescription>
                Select content to feature prominently on the homepage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featuredVerseId">Featured Verse</Label>
                <Select
                  value={featuredVerseId || "none"}
                  onValueChange={(val) => setValue("featuredVerseId", val === "none" ? "" : val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verse..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {(verses || []).map((verse) => (
                      <SelectItem key={verse.id} value={verse.id}>
                        {verse.reference} - {verse.text.slice(0, 60)}...
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={saveMutation.isPending} size="lg">
              <Save className="mr-2 h-4 w-4" />
              {saveMutation.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
