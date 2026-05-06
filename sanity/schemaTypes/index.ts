import {type SchemaTypeDefinition} from "sanity";

import {localeStringType} from "./localeStringType";
import {localeTextType} from "./localeTextType";
import {b2bLandingPageType} from "./b2bLandingPageType";

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    localeStringType,
    localeTextType,
    b2bLandingPageType,
  ],
};
