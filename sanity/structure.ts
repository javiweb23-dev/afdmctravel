import type {StructureResolver} from "sanity/structure";

const singletonPages = [
  {title: "Home Page", schemaType: "homePage", documentId: "homePage"},
  {title: "Services Page", schemaType: "servicesPage", documentId: "servicesPage"},
  {title: "Programs Page", schemaType: "programsPage", documentId: "programsPage"},
  {title: "White Label Page", schemaType: "whiteLabelPage", documentId: "whiteLabelPage"},
  {title: "About Page", schemaType: "aboutPage", documentId: "aboutPage"},
  {title: "Contact Page", schemaType: "contactPage", documentId: "contactPage"},
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("B2B MICE & DMC")
    .items(
      singletonPages.map((page) =>
        S.listItem()
          .title(page.title)
          .child(
            S.document()
              .schemaType(page.schemaType)
              .documentId(page.documentId),
          ),
      ),
    );
