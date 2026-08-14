import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Entry = { q: string; a: string[] };

export default function FaqAccordion({ items }: { items: Entry[] }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={["item-0"]}
      className="rounded-md border border-border bg-card"
    >
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`item-${i}`}
          className="border-b border-border px-5 last:border-b-0"
        >
          <AccordionTrigger className="py-5 text-left text-[1.02rem] font-medium hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <div className="space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground">
              {item.a.map((p, j) => (
                // Answers are authored by us in src/data/site.ts, not user input.
                <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
