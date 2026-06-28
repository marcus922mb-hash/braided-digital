import { Quote } from "lucide-react";
import type { DemoContent } from "@/features/demos/types";
import { SectionHeading } from "../section-heading";
import styles from "../live-preview.module.css";

export function TestimonialsSection({
  content,
  id,
}: {
  content: DemoContent;
  id: string;
}) {
  return (
    <section id={id} className={styles.section}>
      <SectionHeading {...content.headings.testimonials} align="center" />
      <div className={styles.testimonialGrid}>
        {content.testimonials.map((testimonial, index) => (
          <figure className={styles.testimonial} key={`${testimonial.name}-${index}`}>
            <Quote size={22} />
            <blockquote>{testimonial.content}</blockquote>
            <figcaption>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

