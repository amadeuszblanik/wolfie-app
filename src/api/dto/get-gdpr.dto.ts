import sanitizeHtml from "sanitize-html";
import { GdprResponseModel } from "../response-model/gdpr.response-model";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    div: ["id"],
  },
};

const getGdprDto = (data: GdprResponseModel): GdprResponseModel => ({
  lastUpdated: new Date(data.lastUpdated),
  html: sanitizeHtml(data.html, SANITIZE_OPTIONS),
});

export default getGdprDto;
