import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  LegalList,
} from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the DOTDAY Terms of Service covering website use, product purchases, order policies, intellectual property, and customer responsibilities.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      standfirst="Please read these terms carefully. By accessing and using DOTDAY's website and services, you agree to be bound by these Terms of Service."
      updated="June 2026"
      current="/terms-of-service"
    >
      <p>
        This website (
        <a href="https://www.thedotday.com">https://www.thedotday.com</a>) is
        owned and operated by DOTDAY ("we", "us", and "our"). Access and use of
        this website and its related services (the "Services") are provided to
        you on condition that you accept these Terms.
      </p>
      <p>
        By accessing or using this website or the Services, you agree to these
        Terms.
      </p>
      <p>
        DOTDAY is a platform through which our website, products, and services
        are offered in a safe, legal, and compliant manner. The Services include
        these Terms of Service and any additional terms, conditions, and
        policies referenced herein or available by hyperlink. These Terms apply
        to all users of the site, including browsers, customers, merchants, and
        contributors of content.
      </p>
      <p>
        Any new features or tools added to our store shall also be subject to
        these Terms of Service. You can review the most current version of these
        Terms at any time on this page.
      </p>

      <LegalSection heading="1. Online Store Terms">
        <p>
          By agreeing to these Terms of Service, you represent and warrant that
          you are at least the age of majority in your state or province of
          residence and are legally capable of entering into a binding contract.
        </p>
        <p>
          All content, data, graphics, photographs, images, audio, video,
          software, systems, processes, trademarks, trade names, and other
          information (collectively, the "Content") are proprietary to DOTDAY or
          third-party licensors. The Content is protected by United States and
          international copyright and trademark laws.
        </p>
        <p>
          You may not use our products for any illegal or unauthorized purpose,
          nor may you violate any laws in your jurisdiction (including but not
          limited to copyright laws) in the use of the Services.
        </p>
      </LegalSection>

      <LegalSection heading="2. General Conditions">
        <p>
          We reserve the right, in our sole discretion, to take any actions we
          deem necessary and appropriate to preserve the integrity of this
          website or the Services. DOTDAY may, without notice, temporarily
          suspend your access to this website if we reasonably suspect
          unauthorized access or misuse.
        </p>
        <p>
          You understand that your content (not including credit card
          information) may be transferred unencrypted and involve transmissions
          over various networks. Credit card information is always encrypted
          during transfer.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell, or exploit
          any portion of the Services or access to the Services without express
          written permission from us.
        </p>
      </LegalSection>

      <LegalSection heading="3. Accuracy of Information">
        <p>
          The material on this site is provided for general information only and
          should not be relied upon as the sole basis for making decisions
          without consulting primary, more accurate, or more complete sources of
          information.
        </p>
        <p>
          We reserve the right to modify the contents of this site at any time,
          but we have no obligation to update any information. You agree that it
          is your responsibility to monitor changes to our site.
        </p>
        <p>
          Occasionally there may be information on our site that contains
          typographical errors, inaccuracies, or omissions. We reserve the right
          to correct any errors, inaccuracies, or omissions, and to change or
          update information or cancel orders if any information is inaccurate at
          any time without prior notice.
        </p>
      </LegalSection>

      <LegalSection heading="4. Modifications to Services and Prices">
        <p>Prices for our products are subject to change without notice.</p>
        <p>
          We reserve the right at any time to modify or discontinue the Services
          (or any part thereof) without notice. We shall not be liable to you or
          to any third-party for any modification, price change, suspension, or
          discontinuance of the Services.
        </p>
      </LegalSection>

      <LegalSection heading="5. Products and Services">
        <p>
          Certain products or services may be available exclusively online
          through this website. These products or services may have limited
          quantities and are subject to return or exchange only according to our
          Return Policy.
        </p>
        <p>
          We have made every effort to display as accurately as possible the
          colors and images of our products. We cannot guarantee that your
          computer monitor's display of any color will be accurate.
        </p>
        <p>
          We reserve the right to limit the sales of our products or Services to
          any person, geographic region, or jurisdiction. We may exercise this
          right on a case-by-case basis. We reserve the right to limit
          quantities of any products or Services that we offer. All descriptions
          of products or product pricing are subject to change at any time
          without notice.
        </p>
      </LegalSection>

      <LegalSection heading="6. Billing & Account Information">
        <p>
          We reserve the right to refuse any order you place with us. We may, in
          our sole discretion, limit or cancel quantities purchased per person,
          per household, or per order. We reserve the right to limit or prohibit
          orders that appear to be placed by dealers, resellers, or
          distributors.
        </p>
        <p>
          You agree to provide current, complete, and accurate purchase and
          account information for all purchases made at our store. You agree to
          promptly update your account and other information, including your
          email address and credit card numbers and expiration dates, so that we
          can complete your transactions and contact you as needed.
        </p>
      </LegalSection>

      <LegalSection heading="7. Third-Party Services">
        <p>
          We may provide you with access to third-party tools over which we
          neither monitor nor have any control nor input.
        </p>
        <p>
          You acknowledge and agree that we provide access to such tools "as is"
          and "as available" without any warranties, representations, or
          conditions of any kind and without any endorsement. We shall have no
          liability whatsoever arising from or relating to your use of optional
          third-party tools.
        </p>
        <p>
          Any use by you of optional tools offered through the site is entirely
          at your own risk and discretion. You should ensure that you are
          familiar with and approve of the terms on which tools are provided by
          the relevant third-party provider(s).
        </p>
      </LegalSection>

      <LegalSection heading="8. Prohibited Uses">
        <p>
          In addition to other prohibitions as set forth in these Terms of
          Service, you are prohibited from using the site or its content:
        </p>
        <LegalList
          items={[
            "For any unlawful purpose",
            "To solicit others to perform or participate in any unlawful acts",
            "To violate any federal, state, or local regulations, rules, laws, or ordinances",
            "To infringe upon or violate our intellectual property rights or the intellectual property rights of others",
            "To harass, abuse, insult, harm, defame, slander, disparage, or intimidate",
            "To submit false or misleading information",
            "To upload or transmit viruses or any other type of malicious code",
            "To collect or track the personal information of others",
            "To spam, phish, or scrape",
            "To interfere with or circumvent the security features of the Services or any related website",
          ]}
        />
        <p>
          We reserve the right to terminate your use of the Services or any
          related website for violating any of the prohibited uses.
        </p>
      </LegalSection>

      <LegalSection heading="9. Disclaimer of Warranties">
        <p>
          You expressly agree that your use of, or inability to use, the
          Services is at your sole risk. Except as expressly stated by us, the
          website, the Services, the products, and the content are provided on
          an "AS IS", "where is", and "with all faults" basis. We make no
          representations or warranties of any kind, whether express or implied,
          including but not limited to: (i) the availability, accuracy, or
          completeness; (ii) uninterrupted access; or (iii) any warranties of
          title, non-infringement, merchantable quality, or fitness for a
          particular purpose.
        </p>
        <p>
          We do not represent or warrant that this website, the Services, the
          products, and the Content will be timely, secure, uninterrupted, or
          error-free, that defects will be corrected, or that this website or the
          Services are free of viruses or other harmful components.
        </p>
      </LegalSection>

      <LegalSection heading="10. Limitation of Liability">
        <p>
          In no case shall DOTDAY, our directors, officers, employees,
          affiliates, agents, contractors, suppliers, service providers, or
          licensors be liable for any injury, loss, claim, or any direct,
          indirect, incidental, punitive, special, or consequential damages of
          any kind, including lost profits, lost revenue, lost savings, loss of
          data, replacement costs, or any similar damages, whether based in
          contract, tort, or any other legal theory.
        </p>
      </LegalSection>

      <LegalSection heading="11. Indemnification">
        <p>
          You agree to indemnify and hold harmless DOTDAY, its affiliates,
          partners, employees, and service providers from claims or liabilities
          arising from misuse of the website or violation of these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="12. Severability">
        <p>
          If any provision of these Terms is found unenforceable or invalid, the
          remaining provisions shall remain in effect.
        </p>
      </LegalSection>

      <LegalSection heading="13. Governing Law">
        <p>
          These Terms of Service shall be governed by and interpreted in
          accordance with the laws of the State of Texas, United States.
        </p>
      </LegalSection>

      <LegalSection heading="14. Changes to Terms">
        <p>
          DOTDAY reserves the right to update or modify these Terms of Service at
          any time without prior notice. Your continued use of the website
          following any modifications constitutes your acceptance of the updated
          Terms.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
