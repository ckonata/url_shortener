import Validator from "validatorjs";
import httpError from "http-errors";

type RequestBody = { [key: string]: any };

const validationSchema = (
  body: RequestBody,
  validationSchema: Validator.Rules
) => {
  let validation = new Validator(body, validationSchema);

  if (validation.fails()) {
    const errors = validation.errors.all();

    const concatenatedErrors: string[] = [];
    Object.keys(errors).forEach((key) => {
      concatenatedErrors.push(validation.errors.first(key) as string);
    });

    throw new httpError.BadRequest(concatenatedErrors.join(" . "));
  } else {
    console.log("Validations passed");
  }
};

export const validateCreateShortUrl = (body: RequestBody) =>
  validationSchema(body, {
    url: "url|required",
    id: "string|min:5|max:10",
  });

export const validateUpdateShortUrl = (body: RequestBody) =>
  validationSchema(body, {
    url: "url|required",
  });
