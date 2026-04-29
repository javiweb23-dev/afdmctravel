import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {tourType} from './tourType'
import {privateExperienceType} from './privateExperienceType'
import {corporateRetreatType} from './corporateRetreatType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    tourType,
    privateExperienceType,
    corporateRetreatType,
  ],
}
