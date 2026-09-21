import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { contact } from "../data/site";
import { products } from "../data/products";
import styles from "./Contact.module.css";

/**
 * The shape of the request for quote.
 *
 * Every value is a string because every control is a text input, a select or
 * a textarea. Keeping one flat object means one state setter and one change
 * handler instead of fifteen of each.
 */
type EnquiryForm = {
  bagType: string;
  swl: string;
  safetyFactor: string;
  baseDimensions: string;
  height: string;
  liner: string;
  quantity: string;
  material: string;
  destination: string;
  neededBy: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

type FieldName = keyof EnquiryForm;

type ChangeHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
) => void;

type SelectOption = { value: string; label: string };

const EMPTY_FORM: EnquiryForm = {
  bagType: "",
  swl: "",
  safetyFactor: "",
  baseDimensions: "",
  height: "",
  liner: "",
  quantity: "",
  material: "",
  destination: "",
  neededBy: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

/** Human labels for the email body. Also the accessible labels on screen. */
const LABELS: Record<FieldName, string> = {
  bagType: "Bag type",
  swl: "Safe working load",
  safetyFactor: "Safety factor",
  baseDimensions: "Base dimensions",
  height: "Height",
  liner: "Liner required",
  quantity: "Quantity",
  material: "Material being packed",
  destination: "Destination",
  neededBy: "Needed by",
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  notes: "Notes",
};

/** Order the email body follows, mirroring the three fieldsets on screen. */
const EMAIL_SECTIONS: { heading: string; keys: FieldName[] }[] = [
  {
    heading: "About the bag",
    keys: ["bagType", "swl", "safetyFactor", "baseDimensions", "height", "liner"],
  },
  {
    heading: "About the order",
    keys: ["quantity", "material", "destination", "neededBy"],
  },
  {
    heading: "About you",
    keys: ["name", "company", "email", "phone", "notes"],
  },
];

const NOT_SURE = "Not sure yet";

const BAG_TYPE_OPTIONS: SelectOption[] = [
  ...products.map((product) => ({ value: product.id, label: product.name })),
  { value: "unsure", label: NOT_SURE },
];

const SWL_OPTIONS: SelectOption[] = [
  "500 kg",
  "750 kg",
  "1,000 kg",
  "1,250 kg",
  "1,500 kg",
  "2,000 kg",
  "Other",
].map((value) => ({ value, label: value }));

const SAFETY_FACTOR_OPTIONS: SelectOption[] = [
  "5:1 single trip",
  "6:1 multi trip",
  "Not sure",
].map((value) => ({ value, label: value }));

const LINER_OPTIONS: SelectOption[] = ["Yes", "No", "Not sure"].map((value) => ({
  value,
  label: value,
}));

/** Turns the stored bag type id back into something a person can read. */
function bagTypeLabel(value: string): string {
  if (!value) return "";
  if (value === "unsure") return NOT_SURE;
  return products.find((product) => product.id === value)?.name ?? value;
}

/** Plain text email body. Empty fields are left out entirely. */
function buildBody(form: EnquiryForm): string {
  const lines: string[] = ["Quote request sent from the ATC Group website.", ""];

  for (const section of EMAIL_SECTIONS) {
    const rows = section.keys
      .map((key) => {
        const value = key === "bagType" ? bagTypeLabel(form.bagType) : form[key].trim();
        return value ? `${LABELS[key]}: ${value}` : null;
      })
      .filter((row): row is string => row !== null);

    if (rows.length === 0) continue;

    lines.push(section.heading.toUpperCase(), ...rows, "");
  }

  return lines.join("\n");
}

function buildSubject(form: EnquiryForm): string {
  const parts = [bagTypeLabel(form.bagType), form.swl.trim()].filter(Boolean);
  return parts.length > 0
    ? `Quote request: ${parts.join(" ")}`
    : "Quote request from the website";
}

type FieldProps = {
  name: FieldName;
  value: string;
  onChange: ChangeHandler;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
};

/** A labelled text input. The label is a real label, never a placeholder. */
function Field({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
}: FieldProps) {
  const id = `enquiry-${name}`;

  return (
    <p className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {LABELS[name]}
        {required && <span className={styles.req}>required</span>}
      </label>
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
    </p>
  );
}

type SelectProps = {
  name: FieldName;
  value: string;
  onChange: ChangeHandler;
  options: SelectOption[];
  placeholder: string;
};

function SelectField({ name, value, onChange, options, placeholder }: SelectProps) {
  const id = `enquiry-${name}`;

  return (
    <p className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {LABELS[name]}
      </label>
      <span className={styles.selectWrap}>
        <select
          className={styles.select}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </p>
  );
}

/**
 * Contact.
 *
 * The form asks for what a quote actually needs, so the first reply can carry
 * a specification and a price instead of another round of questions. There is
 * no backend, so submitting composes the enquiry and hands it to the visitor's
 * email client.
 */
export function Contact() {
  const [form, setForm] = useState<EnquiryForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange: ChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name as FieldName]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(buildSubject(form));
    const body = encodeURIComponent(buildBody(form));

    window.location.href = `${contact.emailHref}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <Seo
        title="Contact"
        description={`Request a quote for FIBC bulk bags, woven sacks or reconditioned jumbo bags. Speak to ${contact.person} at ATC Group in Ahmedabad.`}
      />

      <section className={styles.head}>
        <div className="shell">
          <Reveal variant="rule" className="rule" />
          <Reveal className={styles.eyebrowRow} delay={60}>
            <span className="eyebrow">Contact</span>
          </Reveal>
          <Reveal as="h1" variant="mask" delay={120} className={styles.title}>
            Tell us what you need to move.
          </Reveal>
          <Reveal delay={200}>
            <p className="lede">
              The more of this you fill in, the faster a real number comes back.
              Skip anything you do not know yet. We will ask about the rest when
              we reply.
            </p>
          </Reveal>
        </div>
      </section>

      <div className={`shell ${styles.layout}`}>
        <div className={styles.formCol}>
          {submitted ? (
            <Reveal className={styles.success} role="status">
              <span className="eyebrow">Enquiry ready</span>
              <h2 className={styles.successTitle}>Your email client should have opened.</h2>
              <p className={styles.successBody}>
                We have put your answers into a message addressed to {contact.person}.
                Send it and we will read it the same working day. If nothing opened,
                your browser may be blocking mail links. Use one of these instead.
              </p>
              <ul className={styles.successList}>
                <li>
                  <a className={styles.bigLink} href={contact.emailHref}>
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a className={styles.bigLink} href={contact.phoneHref}>
                    {contact.phone}
                  </a>
                </li>
              </ul>
              <div className={styles.successActions}>
                <Button href={contact.whatsappHref}>Message on WhatsApp</Button>
                <Button tone="ghost" onClick={() => setSubmitted(false)}>
                  Amend and send again
                </Button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>About the bag</legend>
                  <div className={styles.grid}>
                    <SelectField
                      name="bagType"
                      value={form.bagType}
                      onChange={handleChange}
                      options={BAG_TYPE_OPTIONS}
                      placeholder="Select a bag type"
                    />
                    <SelectField
                      name="swl"
                      value={form.swl}
                      onChange={handleChange}
                      options={SWL_OPTIONS}
                      placeholder="Select a load"
                    />
                    <SelectField
                      name="safetyFactor"
                      value={form.safetyFactor}
                      onChange={handleChange}
                      options={SAFETY_FACTOR_OPTIONS}
                      placeholder="Select a factor"
                    />
                    <SelectField
                      name="liner"
                      value={form.liner}
                      onChange={handleChange}
                      options={LINER_OPTIONS}
                      placeholder="Select an option"
                    />
                    <Field
                      name="baseDimensions"
                      value={form.baseDimensions}
                      onChange={handleChange}
                      placeholder="e.g. 95 x 95 cm"
                    />
                    <Field
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      placeholder="e.g. 120 cm"
                    />
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>About the order</legend>
                  <div className={styles.grid}>
                    <Field
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 5,000 bags"
                    />
                    <Field
                      name="material"
                      value={form.material}
                      onChange={handleChange}
                      placeholder="e.g. refined sugar"
                    />
                    <Field
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      placeholder="City, country or port"
                    />
                    <Field
                      name="neededBy"
                      value={form.neededBy}
                      onChange={handleChange}
                      placeholder="e.g. within 8 weeks"
                    />
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>About you</legend>
                  <div className={styles.grid}>
                    <Field
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                    <Field
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      required
                      autoComplete="organization"
                    />
                    <Field
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      required
                      autoComplete="email"
                    />
                    <Field
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                      autoComplete="tel"
                    />
                    <p className={`${styles.field} ${styles.fieldWide}`}>
                      <label className={styles.label} htmlFor="enquiry-notes">
                        {LABELS.notes}
                      </label>
                      <textarea
                        className={styles.textarea}
                        id="enquiry-notes"
                        name="notes"
                        rows={5}
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Anything else that would help us price this correctly"
                      />
                    </p>
                  </div>
                </fieldset>

                <div className={styles.actions}>
                  <Button type="submit">Send this enquiry</Button>
                  <p className={styles.actionNote}>
                    This opens your email client with the answers already written
                    out. Nothing is sent until you press send.
                  </p>
                </div>
              </form>
            </Reveal>
          )}
        </div>

        <aside className={styles.aside} aria-label="Direct contact details">
          <Reveal className={styles.asideInner} delay={120}>
            <div className={styles.card}>
              <span className="eyebrow">Speak to someone</span>
              <p className={styles.person}>{contact.person}</p>
              <a className={styles.bigLink} href={contact.phoneHref}>
                {contact.phone}
              </a>
              <a className={styles.bigLink} href={contact.emailHref}>
                {contact.email}
              </a>
              <div className={styles.asideLinks}>
                <a href={contact.whatsappHref} target="_blank" rel="noreferrer noopener">
                  WhatsApp
                </a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer noopener">
                  LinkedIn
                </a>
              </div>
            </div>

            <div className={styles.card}>
              <span className="eyebrow">Where we are</span>
              <address className={styles.address}>
                {contact.address.line1}
                <br />
                {contact.address.city}
                <br />
                {contact.address.state}, {contact.address.country}
              </address>
              <p className={styles.hours}>{contact.hours}</p>
            </div>

            <div className={styles.card}>
              <span className="eyebrow">What happens next</span>
              <ol className={styles.next}>
                <li>We read your enquiry the same working day.</li>
                <li>We come back with a specification and a price.</li>
                <li>We send samples where they help you decide.</li>
              </ol>
            </div>
          </Reveal>
        </aside>
      </div>
    </>
  );
}
