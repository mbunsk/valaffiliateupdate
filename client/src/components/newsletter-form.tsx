import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectName: z.string().min(1, "Project name is required"),
  projectSummary: z.string().min(10, "Project summary must be at least 10 characters"),
  siteUrl: z.string().url("Invalid URL"),
  platform: z.string().min(1, "Please select a platform"),
});

type FormData = z.infer<typeof formSchema>;

export default function NewsletterForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectName: "",
      projectSummary: "",
      siteUrl: "",
      platform: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData & { screenshot?: File }) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'screenshot' && value) {
          formData.append(key, value);
        }
      });
      
      if (selectedFile) {
        formData.append('screenshot', selectedFile);
      }

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      form.reset();
      setSelectedFile(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit your project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitMutation.mutate({ ...data, screenshot: selectedFile || undefined });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <section id="submit" className="py-20 bg-gradient-to-br from-primary/15 via-background to-accent/15 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 text-5xl opacity-20 animate-float">⭐</div>
        <div className="absolute bottom-20 left-10 text-4xl opacity-20 animate-bounce-gentle">🏆</div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg bg-gradient-to-r from-accent/20 to-secondary/30 border-accent/30">
            <span className="w-8 h-8 bg-gradient-to-br from-accent to-secondary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 animate-pulse-slow">
              3
            </span>
            ⭐ Get Featured!
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black mb-6 gradient-text">
            Share Your Exploration! <span style={{fontFamily: 'Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols'}}>🌟</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-4">
            Submit your project and get featured to our amazing community of{" "}
            <span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-lg animate-pulse-slow">200,000+ idea explorers</span>!
          </p>
          <p className="text-lg text-foreground/60">
            Show off your concept and inspire other curious minds! 🚀✨
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-accent/30 bg-card/80 backdrop-blur-sm animate-pulse-slow">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <span className="text-3xl animate-wiggle">📝</span>
              <h3 className="text-xl font-bold text-foreground mt-2">Share Your Amazing Idea!</h3>
              <p className="text-foreground/70">Fill out the form below to get your concept featured</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idea Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your project/concept name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectSummary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Concept Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Brief description of your idea and what makes it interesting..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="siteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landing Page URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://your-mockup-page.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform Used</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="replit">Replit</SelectItem>
                          <SelectItem value="lovable">Lovable</SelectItem>
                          <SelectItem value="typedream">Typedream</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Screenshot (Optional)</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-primary-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                          <span>Upload a screenshot</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      {selectedFile && (
                        <p className="text-sm text-green-600 font-medium">{selectedFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    size="lg"
                    className="px-10 py-4 text-xl font-bold rounded-2xl shadow-2xl shadow-accent/30 bg-gradient-to-r from-accent via-secondary to-accent hover:from-secondary hover:via-accent hover:to-secondary transition-all duration-300 transform hover:scale-110"
                  >
                    {submitMutation.isPending && <Loader2 className="mr-3 h-6 w-6 animate-spin" />}
                    <span className="mr-2">🌟</span>
                    {submitMutation.isPending ? "Submitting..." : "Submit My Idea!"}
                    {!submitMutation.isPending && <span className="ml-2">🚀</span>}
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl px-6 py-4 border border-primary/20">
                <span className="text-2xl mr-3">👀</span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">
                    We handpick the most interesting ideas every week!
                  </p>
                  <p className="text-xs text-foreground/70">
                    Selected concepts get featured to thousands of curious explorers ✨
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
