export const get = {
  handler: async (ctx: any) => {
    return await ctx.db.query('trends').collect();
  },
};
