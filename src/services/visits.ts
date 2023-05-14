import knex from "../config/knex";
import httpError from "http-errors";

export const registerVisit = async (url_id: string, ip: string) =>
  knex("visits").insert({ url_id, ip });

export const getLastVisits = async (
  user_id: number,
  limit: number,
  offset: number
) => {
  await knex("visits")
    .join("urls", "urls.id", "visits.url_id")
    .select(["urls.id", "urls.url", "visits.ip", "visits.created_at"])
    .where({ user_id })
    .limit(limit || 15)
    .offset(offset || 0)
    .orderBy("visits.created_at", "desc");
};

export const getVisitsByUrl = async (
  url_id: string,
  user_id: number,
  limit: number,
  offset: number
) => {
  const url = await knex("urls")
    .where({ id: url_id })
    .select(["user_id"])
    .first();

  if (!url) throw new httpError.NotFound("Urls does not exists");

  if (url.user_id !== user_id)
    throw new httpError.Unauthorized(
      "You are not allowed to view this resource."
    );

  const result = knex("visits")
    .where({ url_id })
    .limit(limit || 15)
    .offset(offset || 0)
    .orderBy("created_at", "desc");
};
