// upstash redis db
import { Redis } from "@upstash/redis";

const getRedisCredentials = () => {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || null;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || null;

  if (!redisUrl || !redisToken) throw new Error("Redis Credentials Missing");
  else return { redisUrl, redisToken };
};

const db = new Redis({
  url: getRedisCredentials().redisUrl,
  token: getRedisCredentials().redisToken,
});

export default db;
