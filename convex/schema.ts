import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  trends: defineTable({
    name: v.string(),
    description: v.string(),
    source: v.string(), // e.g., "Social Media", "Fashion Week"
  }),
  concepts: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    trendId: v.id('trends'),
  }).index('by_trend', ['trendId']),
});
