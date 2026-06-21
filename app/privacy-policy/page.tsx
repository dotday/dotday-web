import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  LegalList,
} from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the DOTDAY Privacy Policy to learn how we collect, use, store, and protect customer information across our website, orders, and communications.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      standfirst="Information about how DOTDAY collects, uses, and protects your data."
      updated="June 2026"
      current="/privacy-policy"
    >
      <LegalSection heading="Information We Collect">
        <p>
          When you use the DOTDAY website, we may collect information such as:
        </p>
        <LegalList
          items={[
            "Name",
            "Email address",
            "Shipping and billing address",
            "Phone number",
            "Payment information",
            "Order details",
            "Website usage data",
          ]}
        />
      </LegalSection>

      <LegalSection heading="How We Use Information">
        <p>DOTDAY may use collected information to:</p>
        <LegalList
          items={[
            "Process orders",
            "Provide customer support",
            "Improve website performance",
            "Send order updates",
            "Respond to inquiries",
            "Improve products and services",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Payment Information">
        <p>
          Payments are processed through secure third-party payment providers.
          DOTDAY does not store full payment card information on our servers.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies & Analytics">
        <p>
          The DOTDAY website may use cookies, analytics tools, and tracking
          technologies to improve website functionality and user experience.
        </p>
      </LegalSection>

      <LegalSection heading="Third-Party Services">
        <p>DOTDAY may use third-party services for:</p>
        <LegalList
          items={[
            "Payment processing",
            "Shipping",
            "Analytics",
            "Marketing",
            "Website hosting",
          ]}
        />
        <p>
          These providers may have access to limited customer information
          necessary to perform their services.
        </p>
      </LegalSection>

      <LegalSection heading="Data Security">
        <p>
          DOTDAY takes reasonable measures to help protect customer information
          from unauthorized access or misuse.
        </p>
      </LegalSection>

      <LegalSection heading="Your Rights">
        <p>
          You may contact DOTDAY to request updates or removal of your personal
          information where applicable.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          For privacy-related inquiries:
          <br />
          DOTDAY Support
          <br />
          Email: <a href="mailto:info@thedotday.com">info@thedotday.com</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
