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
    <section id="submit" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
              3
            </span>
            Get Featured
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Want to Be Featured in Our Newsletter?
          </h2>
          <p className="text-lg text-gray-600">
            We showcase the best early startup ideas and projects to our audience of{" "}
            <span className="font-semibold text-primary">200,000+ founders, investors, and builders</span>.
          </p>
        </div>

        <Card className="shadow-lg border border-gray-200">
          <CardContent className="p-8">
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
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your startup/project name" {...field} />
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
                      <FormLabel>Project Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Brief description of what your project does and why it's unique..."
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
                      <FormLabel>Site URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://your-landing-page.com" {...field} />
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
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
                  >
                    {submitMutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Submit for Consideration
                  </Button>
                </div>
              </form>
            </Form>

            <p className="mt-6 text-sm text-gray-600 text-center">
              We personally select projects based on usefulness, clarity, and potential. If chosen, your idea will be seen by thousands.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
