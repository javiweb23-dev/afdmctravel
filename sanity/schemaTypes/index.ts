import {type SchemaTypeDefinition} from "sanity";

import {localeStringType} from "./localeStringType";
import {localeTextType} from "./localeTextType";
import {localePortableTextType} from "./localePortableTextType";
import {seoMetaType} from "./seoMetaType";
import {imageWithAltType} from "./imageWithAltType";
import {serviceItemType} from "./serviceItemType";
import {programItemType} from "./programItemType";
import {stepItemType} from "./stepItemType";
import {faqItemType} from "./faqItemType";
import {homePageType} from "./homePageType";
import {servicesPageType} from "./servicesPageType";
import {programsPageType} from "./programsPageType";
import {whiteLabelPageType} from "./whiteLabelPageType";
import {aboutPageType} from "./aboutPageType";
import {contactPageType} from "./contactPageType";
import {agencyRegistrationPageType} from "./agencyRegistrationPageType";

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    localeStringType,
    localeTextType,
    localePortableTextType,
    seoMetaType,
    imageWithAltType,
    serviceItemType,
    programItemType,
    stepItemType,
    faqItemType,
    homePageType,
    servicesPageType,
    programsPageType,
    whiteLabelPageType,
    aboutPageType,
    contactPageType,
    agencyRegistrationPageType,
  ],
};
