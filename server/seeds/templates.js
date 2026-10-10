exports.seed = async (knex) => {
  await knex('favorites').del();
  await knex('templates').del();

  await knex('templates').insert([
    {
      name: 'SaaS Landing Page',
      description: 'A modern landing page template for SaaS products with hero, features, and pricing sections.',
      thumbnail_url: 'https://placehold.co/400x250/6366f1/white?text=SaaS+Landing',
      category: 'Landing Page',
    },
    {
      name: 'E-Commerce Store',
      description: 'Full-featured e-commerce template with product grid, cart, and checkout flow.',
      thumbnail_url: 'https://placehold.co/400x250/ec4899/white?text=E-Commerce',
      category: 'E-Commerce',
    },
    {
      name: 'Portfolio Minimal',
      description: 'Clean minimal portfolio template for designers and developers to showcase their work.',
      thumbnail_url: 'https://placehold.co/400x250/14b8a6/white?text=Portfolio',
      category: 'Portfolio',
    },
    {
      name: 'Admin Dashboard',
      description: 'Feature-rich admin dashboard with charts, tables, and analytics widgets.',
      thumbnail_url: 'https://placehold.co/400x250/f59e0b/white?text=Dashboard',
      category: 'Dashboard',
    },
    {
      name: 'Blog Platform',
      description: 'Clean blog template with article listing, tags, and author profile sections.',
      thumbnail_url: 'https://placehold.co/400x250/10b981/white?text=Blog',
      category: 'Blog',
    },
    {
      name: 'Agency Website',
      description: 'Bold agency website template with animated sections, team, and contact form.',
      thumbnail_url: 'https://placehold.co/400x250/8b5cf6/white?text=Agency',
      category: 'Landing Page',
    },
  ]);
};
