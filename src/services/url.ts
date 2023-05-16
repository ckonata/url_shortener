import { registerVisit } from "./visits";
import { validateCreateShortUrl, validateUpdateShortUrl } from "./validator";
import httpError from "http-errors";
import knex from "../config/knex";

export const createShortUrl = async (
  body: { url: string; id?: string },
  user_id: number
) => {
  validateCreateShortUrl(body);

  if (body.id) {
    const current_record = await knex("urls").where({ id: body.id }).first();
    if (current_record) {
      throw new httpError.Conflict("Id provided already exists");
    }
  }

  const results = (
    await knex("urls").insert(
      {
        id: body.id,
        url: body.url,
        user_id,
      },
      "*"
    )
  )[0];

  return results;
};

export const resolveUrl = async (id: string, ip: string) => {
  const url = await knex("urls").where({ id }).select(["url"]).first();
  if (!url) throw new httpError.NotFound("Id provided is not a valid url");

  await registerVisit(id, ip);
  return url.url;
};

export const updateUrls = async (
  id: string,
  body: { url: string },
  user_id: number
) => {
  validateUpdateShortUrl(body);
  const url = await knex("urls").where({ id }).select(["user_id"]).first();

  if (!url) throw new httpError.NotFound("Url does not exist.");

  if (url.user_id !== user_id)
    throw new httpError.Unauthorized(
      "You are not authorized to update this resource."
    );

  var result = await knex("urls").where({ id }).update({ url: body.url }, "*");

  return result[0];
};

export const deleteUrl = async (id: string, user_id: number) => {
  const url = await knex("urls").where({ id }).select(["user_id"]).first();

  if (!url) throw new httpError.NotFound("Url id provided does not exist.");

  if (url.user_id !== user_id)
    throw new httpError.Unauthorized(
      "You are not authorized to delete this resource."
    );

  await knex("urls").where({ id }).delete();
  return true;
};

export const getUrls = async (
  user_id: number,
  limit: number,
  offset: number
) => {
  const urls = await knex("urls")
    .where({ user_id })
    .leftJoin("visits", "urls.id", "visits.url_id")
    .select([
      "urls.id",
      "urls.url",
      "urls.created_at",
      knex.raw("count(visits.id) as visits_count"),
    ])
    .limit(limit || 15)
    .offset(offset || 0)
    .groupBy("urls.id")
    .orderBy("urls.created_at", "desc");

  return urls;
};
