export type SiteContent = {
  hero: {
    locationLabel: string;
    artistName: string;
    instagramHandle: string;
    instagramUrl: string;
    tiktokHandle: string;
    tiktokUrl: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    tags: string[];
  };
  about: {
    heading: string;
    bodyOne: string;
    bodyTwo: string;
    imageAlt: string;
  };
  booking: {
    heading: string;
    intro: string;
    responseLabel: string;
    responseTime: string;
    fitNote: string;
  };
  form: {
    requestTypeLabel: string;
    requestTypeAppointmentLabel: string;
    requestTypeConsultationLabel: string;
    consultationHelpText: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    instagramLabel: string;
    instagramPlaceholder: string;
    placementLabel: string;
    placementHint: string;
    placementPlaceholder: string;
    sizeLabel: string;
    sizeHint: string;
    sizeMinLabel: string;
    sizeMaxLabel: string;
    styleLabel: string;
    styleOptions: string[];
    colorLabel: string;
    colorOptions: string[];
    ideaLabel: string;
    ideaPlaceholder: string;
    additionalInfoLabel: string;
    additionalInfoHint: string;
    additionalInfoPlaceholder: string;
    referencesLabel: string;
    referencesHint: string;
    referencesNoneText: string;
    referencesAttachedSingular: string;
    referencesAttachedPlural: string;
    submitText: string;
    submittingText: string;
    confirmationText: string;
    disclaimerText: string;
    validationName: string;
    validationEmail: string;
    validationPlacement: string;
    validationDescription: string;
    successMessage: string;
    errorFallback: string;
  };
  portfolio: {
    heading: string;
    subtitle: string;
    handle: string;
    emptyMessage: string;
  };
  whatToExpect: {
    heading: string;
    depositsTitle: string;
    depositsBody: string;
    rulesTitle: string;
    rulesBody: string;
    aftercareTitle: string;
    aftercareBody: string;
  };
  guidelines: {
    heading: string;
    items: string[];
    footerTemplate: string;
  };
};

export const defaultSiteContent: SiteContent = {
  hero: {
    locationLabel: "NORTH DALLAS TATTOO ARTIST",
    artistName: "𝔑𝔦𝔠𝔥𝔬𝔩𝔞𝔰",
    instagramHandle: "@rolandtattoos",
    instagramUrl: "https://www.instagram.com/rolandtattoos/?hl=en",
    tiktokHandle: "@rolandtattoos",
    tiktokUrl: "https://www.tiktok.com/@rolandtattoos",
    intro: "",
    primaryCta: "Book an Appointment",
    secondaryCta: "View Portfolio",
    tags: ["Fine line craft", "Bold blackwork", "Woodcut energy"],
  },
  about: {
    heading: "About Nicholas",
    bodyOne:
      "Nicholas focuses on clean, bold tattooing with details that hold up over time. His style blends fine line precision with black and grey depth, and every piece is built around flow, placement, and long-term readability.",
    bodyTwo:
      "Bring your concept, references, and placement ideas. The request form handles the first review, then you'll get next steps if the project is a fit.",
    imageAlt: "Nicholas M. Roland portrait",
  },
  booking: {
    heading: "Book an Appointment",
    intro: "Fill this out and you'll get an email confirmation that your request is under review.",
    responseLabel: "",
    responseTime: "",
    fitNote: "",
  },
  form: {
    requestTypeLabel: "What are you booking?",
    requestTypeAppointmentLabel: "Tattoo appointment",
    requestTypeConsultationLabel: "Consultation for a large project",
    consultationHelpText: "Not ready to book a full session? Choose consultation and we'll plan your big project first.",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    phoneLabel: "Phone (optional)",
    phonePlaceholder: "(xxx) xxx-xxxx",
    instagramLabel: "Instagram (optional)",
    instagramPlaceholder: "@yourhandle",
    placementLabel: "Placement",
    placementHint: 'Examples: "outer forearm", "left ribs", "upper back", "behind ear" (open-ended)',
    placementPlaceholder: "Where on your body?",
    sizeLabel: "Size (scale)",
    sizeHint: 'Slide up to 24" max.',
    sizeMinLabel: '1"',
    sizeMaxLabel: '24"',
    styleLabel: "Style",
    styleOptions: [
      "Fine Line - Delicate & Clean",
      "Blackwork - Bold & Graphic",
      "Traditional - Classic Flash Energy",
      "Neo-Traditional - Rich Detail & Contrast",
      "Realism - Depth & Texture",
      "Japanese - Flow & Storytelling",
      "Engraving / Woodcut - Etched Texture",
      "Other / Hybrid Vision",
    ],
    colorLabel: "Color",
    colorOptions: ["Black & Grey", "Color", "Either"],
    ideaLabel: "Describe your idea",
    ideaPlaceholder: "Subject, vibe, details, inspiration, etc.",
    additionalInfoLabel: "Additional information",
    additionalInfoHint: "Optional. Anything else you want me to know.",
    additionalInfoPlaceholder: "Cover-up info, timing, context, etc.",
    referencesLabel: "Reference photos",
    referencesHint: "OPTIONAL but highly recommended: upload photos for idea, placement, and style direction.",
    referencesNoneText: "No reference photos attached yet.",
    referencesAttachedSingular: "reference photo attached.",
    referencesAttachedPlural: "reference photos attached.",
    submitText: "Book an Appointment",
    submittingText: "Submitting...",
    confirmationText: "You'll receive a confirmation email that your request is under review.",
    disclaimerText:
      "Disclaimer: Your design will be available on the day of your appointment. Design changes will be made before we begin tattooing.",
    validationName: "Please enter your name.",
    validationEmail: "Please enter your email.",
    validationPlacement: "Please tell us placement.",
    validationDescription: "Please describe what you want.",
    successMessage: "Submitted! You'll receive an email confirmation shortly.",
    errorFallback: "Something went wrong.",
  },
  portfolio: {
    heading: "Portfolio",
    subtitle: "A few recent pieces. Tap to enlarge.",
    handle: "@nicholasmroland",
    emptyMessage: "Portfolio images are being updated. Please check back soon.",
  },
  whatToExpect: {
    heading: "What to Expect",
    depositsTitle: "Deposits",
    depositsBody: "Deposits secure your appointment and go toward the final price. Deposits are non-refundable.",
    rulesTitle: "Rules",
    rulesBody: "Be on time. Stay hydrated. Don't show up sunburned. If you're sick, reschedule.",
    aftercareTitle: "Aftercare",
    aftercareBody: "You'll get detailed aftercare instructions after your session-follow them to heal clean.",
  },
  guidelines: {
    heading: "Studio Guidelines",
    items: [
      "18+ only (valid ID required).",
      "Deposits required to book.",
      "Respect the artist's time (late arrivals may be cancelled).",
      "You'll receive prep + aftercare instructions before/after your appointment.",
    ],
    footerTemplate: "© {year} Nicholas M. Roland.",
  },
};

export function normalizeSiteContent(input: unknown): SiteContent {
  const source = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;

  const hero = (source.hero && typeof source.hero === "object" ? source.hero : {}) as Record<string, unknown>;
  const about = (source.about && typeof source.about === "object" ? source.about : {}) as Record<string, unknown>;
  const booking = (source.booking && typeof source.booking === "object" ? source.booking : {}) as Record<string, unknown>;
  const form = (source.form && typeof source.form === "object" ? source.form : {}) as Record<string, unknown>;
  const portfolio =
    (source.portfolio && typeof source.portfolio === "object" ? source.portfolio : {}) as Record<string, unknown>;
  const whatToExpect =
    (source.whatToExpect && typeof source.whatToExpect === "object" ? source.whatToExpect : {}) as Record<string, unknown>;
  const guidelines =
    (source.guidelines && typeof source.guidelines === "object" ? source.guidelines : {}) as Record<string, unknown>;

  const stringOrDefault = (value: unknown, fallback: string) =>
    typeof value === "string" && value.trim() ? value : fallback;
  const arrayOrDefault = (value: unknown, fallback: string[]) =>
    Array.isArray(value) && value.every((v) => typeof v === "string") && value.length > 0 ? value : fallback;

  return {
    hero: {
      locationLabel: stringOrDefault(hero.locationLabel, defaultSiteContent.hero.locationLabel),
      artistName: stringOrDefault(hero.artistName, defaultSiteContent.hero.artistName),
      instagramHandle: stringOrDefault(hero.instagramHandle, defaultSiteContent.hero.instagramHandle),
      instagramUrl: stringOrDefault(hero.instagramUrl, defaultSiteContent.hero.instagramUrl),
      tiktokHandle: stringOrDefault(hero.tiktokHandle, defaultSiteContent.hero.tiktokHandle),
      tiktokUrl: stringOrDefault(hero.tiktokUrl, defaultSiteContent.hero.tiktokUrl),
      intro: stringOrDefault(hero.intro, defaultSiteContent.hero.intro),
      primaryCta: stringOrDefault(hero.primaryCta, defaultSiteContent.hero.primaryCta),
      secondaryCta: stringOrDefault(hero.secondaryCta, defaultSiteContent.hero.secondaryCta),
      tags: arrayOrDefault(hero.tags, defaultSiteContent.hero.tags),
    },
    about: {
      heading: stringOrDefault(about.heading, defaultSiteContent.about.heading),
      bodyOne: stringOrDefault(about.bodyOne, defaultSiteContent.about.bodyOne),
      bodyTwo: stringOrDefault(about.bodyTwo, defaultSiteContent.about.bodyTwo),
      imageAlt: stringOrDefault(about.imageAlt, defaultSiteContent.about.imageAlt),
    },
    booking: {
      heading: stringOrDefault(booking.heading, defaultSiteContent.booking.heading),
      intro: stringOrDefault(booking.intro, defaultSiteContent.booking.intro),
      responseLabel: stringOrDefault(booking.responseLabel, defaultSiteContent.booking.responseLabel),
      responseTime: stringOrDefault(booking.responseTime, defaultSiteContent.booking.responseTime),
      fitNote: stringOrDefault(booking.fitNote, defaultSiteContent.booking.fitNote),
    },
    form: {
      fullNameLabel: stringOrDefault(form.fullNameLabel, defaultSiteContent.form.fullNameLabel),
      fullNamePlaceholder: stringOrDefault(form.fullNamePlaceholder, defaultSiteContent.form.fullNamePlaceholder),
      emailLabel: stringOrDefault(form.emailLabel, defaultSiteContent.form.emailLabel),
      emailPlaceholder: stringOrDefault(form.emailPlaceholder, defaultSiteContent.form.emailPlaceholder),
      phoneLabel: stringOrDefault(form.phoneLabel, defaultSiteContent.form.phoneLabel),
      phonePlaceholder: stringOrDefault(form.phonePlaceholder, defaultSiteContent.form.phonePlaceholder),
      instagramLabel: stringOrDefault(form.instagramLabel, defaultSiteContent.form.instagramLabel),
      instagramPlaceholder: stringOrDefault(form.instagramPlaceholder, defaultSiteContent.form.instagramPlaceholder),
      placementLabel: stringOrDefault(form.placementLabel, defaultSiteContent.form.placementLabel),
      placementHint: stringOrDefault(form.placementHint, defaultSiteContent.form.placementHint),
      placementPlaceholder: stringOrDefault(form.placementPlaceholder, defaultSiteContent.form.placementPlaceholder),
      sizeLabel: stringOrDefault(form.sizeLabel, defaultSiteContent.form.sizeLabel),
      sizeHint: stringOrDefault(form.sizeHint, defaultSiteContent.form.sizeHint),
      sizeMinLabel: stringOrDefault(form.sizeMinLabel, defaultSiteContent.form.sizeMinLabel),
      sizeMaxLabel: stringOrDefault(form.sizeMaxLabel, defaultSiteContent.form.sizeMaxLabel),
      styleLabel: stringOrDefault(form.styleLabel, defaultSiteContent.form.styleLabel),
      styleOptions: arrayOrDefault(form.styleOptions, defaultSiteContent.form.styleOptions),
      colorLabel: stringOrDefault(form.colorLabel, defaultSiteContent.form.colorLabel),
      colorOptions: arrayOrDefault(form.colorOptions, defaultSiteContent.form.colorOptions),
      ideaLabel: stringOrDefault(form.ideaLabel, defaultSiteContent.form.ideaLabel),
      ideaPlaceholder: stringOrDefault(form.ideaPlaceholder, defaultSiteContent.form.ideaPlaceholder),
      additionalInfoLabel: stringOrDefault(form.additionalInfoLabel, defaultSiteContent.form.additionalInfoLabel),
      additionalInfoHint: stringOrDefault(form.additionalInfoHint, defaultSiteContent.form.additionalInfoHint),
      additionalInfoPlaceholder: stringOrDefault(
        form.additionalInfoPlaceholder,
        defaultSiteContent.form.additionalInfoPlaceholder
      ),
      referencesLabel: stringOrDefault(form.referencesLabel, defaultSiteContent.form.referencesLabel),
      referencesHint: stringOrDefault(form.referencesHint, defaultSiteContent.form.referencesHint),
      referencesNoneText: stringOrDefault(form.referencesNoneText, defaultSiteContent.form.referencesNoneText),
      referencesAttachedSingular: stringOrDefault(
        form.referencesAttachedSingular,
        defaultSiteContent.form.referencesAttachedSingular
      ),
      referencesAttachedPlural: stringOrDefault(
        form.referencesAttachedPlural,
        defaultSiteContent.form.referencesAttachedPlural
      ),
      submitText: stringOrDefault(form.submitText, defaultSiteContent.form.submitText),
      submittingText: stringOrDefault(form.submittingText, defaultSiteContent.form.submittingText),
      confirmationText: stringOrDefault(form.confirmationText, defaultSiteContent.form.confirmationText),
      disclaimerText: stringOrDefault(form.disclaimerText, defaultSiteContent.form.disclaimerText),
      requestTypeLabel: stringOrDefault(form.requestTypeLabel, defaultSiteContent.form.requestTypeLabel),
      requestTypeAppointmentLabel: stringOrDefault(
        form.requestTypeAppointmentLabel,
        defaultSiteContent.form.requestTypeAppointmentLabel
      ),
      requestTypeConsultationLabel: stringOrDefault(
        form.requestTypeConsultationLabel,
        defaultSiteContent.form.requestTypeConsultationLabel
      ),
      consultationHelpText: stringOrDefault(form.consultationHelpText, defaultSiteContent.form.consultationHelpText),
      validationName: stringOrDefault(form.validationName, defaultSiteContent.form.validationName),
      validationEmail: stringOrDefault(form.validationEmail, defaultSiteContent.form.validationEmail),
      validationPlacement: stringOrDefault(form.validationPlacement, defaultSiteContent.form.validationPlacement),
      validationDescription: stringOrDefault(
        form.validationDescription,
        defaultSiteContent.form.validationDescription
      ),
      successMessage: stringOrDefault(form.successMessage, defaultSiteContent.form.successMessage),
      errorFallback: stringOrDefault(form.errorFallback, defaultSiteContent.form.errorFallback),
    },
    portfolio: {
      heading: stringOrDefault(portfolio.heading, defaultSiteContent.portfolio.heading),
      subtitle: stringOrDefault(portfolio.subtitle, defaultSiteContent.portfolio.subtitle),
      handle: stringOrDefault(portfolio.handle, defaultSiteContent.portfolio.handle),
      emptyMessage: stringOrDefault(portfolio.emptyMessage, defaultSiteContent.portfolio.emptyMessage),
    },
    whatToExpect: {
      heading: stringOrDefault(whatToExpect.heading, defaultSiteContent.whatToExpect.heading),
      depositsTitle: stringOrDefault(whatToExpect.depositsTitle, defaultSiteContent.whatToExpect.depositsTitle),
      depositsBody: stringOrDefault(whatToExpect.depositsBody, defaultSiteContent.whatToExpect.depositsBody),
      rulesTitle: stringOrDefault(whatToExpect.rulesTitle, defaultSiteContent.whatToExpect.rulesTitle),
      rulesBody: stringOrDefault(whatToExpect.rulesBody, defaultSiteContent.whatToExpect.rulesBody),
      aftercareTitle: stringOrDefault(whatToExpect.aftercareTitle, defaultSiteContent.whatToExpect.aftercareTitle),
      aftercareBody: stringOrDefault(whatToExpect.aftercareBody, defaultSiteContent.whatToExpect.aftercareBody),
    },
    guidelines: {
      heading: stringOrDefault(guidelines.heading, defaultSiteContent.guidelines.heading),
      items: arrayOrDefault(guidelines.items, defaultSiteContent.guidelines.items),
      footerTemplate: stringOrDefault(guidelines.footerTemplate, defaultSiteContent.guidelines.footerTemplate),
    },
  };
}
