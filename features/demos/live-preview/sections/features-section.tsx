import { Check } from "lucide-react";
import type { DemoContent } from "@/features/demos/types";
import { SectionHeading } from "../section-heading";
import styles from "../live-preview.module.css";

export function FeaturesSection({
  content,
  id,
}: {
  content: DemoContent;
  id: string;
}) {
  return (
    <section id={id} className={`${styles.section} ${styles.softSection}`}>
      <SectionHeading {...content.headings.features} align="center" />
      <div className={styles.featureGrid}>
        {content.features.map((feature) => (
          <article className={styles.featureCard} key={feature.title}>
            <i><Check size={17} /></i>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

