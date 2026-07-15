import React from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useForm,
} from "./Form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { Send } from "lucide-react";
import { useContactForm } from "../helpers/useContactForm";
import styles from "./ResumeContactForm.module.css";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  website: z.string().optional(),
});

export function ResumeContactForm() {
  const { mutate, isPending } = useContactForm();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
    schema: contactSchema,
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Message sent! I'll get back to you soon.");
        form.setValues({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "An error occurred");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.formContainer}
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px" }}
          value={form.values.website || ""}
          onChange={(e) =>
            form.setValues((prev) => ({ ...prev, website: e.target.value }))
          }
        />

        <div className={styles.formRow}>
          <FormItem name="name" className={styles.flexItem}>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John Doe"
                value={form.values.name}
                onChange={(e) =>
                  form.setValues((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem name="email" className={styles.flexItem}>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="john@example.com"
                value={form.values.email}
                onChange={(e) =>
                  form.setValues((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        <FormItem name="subject">
          <FormLabel>Subject</FormLabel>
          <FormControl>
            <Input
              placeholder="Project Inquiry"
              value={form.values.subject}
              onChange={(e) =>
                form.setValues((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem name="message">
          <FormLabel>Message</FormLabel>
          <FormControl>
            <Textarea
              rows={5}
              placeholder="Tell me a bit about your project or what you're looking for..."
              value={form.values.message}
              onChange={(e) =>
                form.setValues((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={styles.submitButton}
          disabled={isPending}
        >
          <Send size={18} />
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}