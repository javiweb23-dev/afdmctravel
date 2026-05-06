import {type SchemaTypeDefinition} from "sanity";

import {blockContentType} from "./blockContentType";
import {categoryType} from "./categoryType";
import {postType} from "./postType";
import {authorType} from "./authorType";
import {localeStringType} from "./localeStringType";
import {localeTextType} from "./localeTextType";
import {localePortableTextType} from "./localePortableTextType";
import {seoType} from "./seoType";
import {tourType} from "./tourType";
import {privateExperienceType} from "./privateExperienceType";
import {golfPackageType} from "./golfPackageType";
import {corporateRetreatType} from "./corporateRetreatType";
import {b2bLandingPageType} from "./b2bLandingPageType";

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    localeStringType,
    localeTextType,
    localePortableTextType,
    seoType,
    blockContentType,
    categoryType,
    postType,
    authorType,
    tourType,
    privateExperienceType,
    golfPackageType,
    corporateRetreatType,
    b2bLandingPageType,
  ],
};
