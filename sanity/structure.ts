import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('B2B MICE & DMC')
    .items([
      S.listItem()
        .title('B2B Landing Page')
        .child(
          S.document()
            .schemaType('b2bLandingPage')
            .documentId('b2bLandingPage')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['b2bLandingPage'].includes(item.getId()!),
      ),
    ])
