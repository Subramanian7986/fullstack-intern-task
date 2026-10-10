const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const favorites = await db('favorites')
      .join('templates', 'favorites.template_id', 'templates.id')
      .where('favorites.user_id', req.user.id)
      .select('templates.*');
    res.json(favorites);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:templateId', auth, async (req, res) => {
  try {
    const template = await db('templates').where({ id: req.params.templateId }).first();
    if (!template) return res.status(404).json({ error: 'Template not found' });
    await db('favorites').insert({ user_id: req.user.id, template_id: req.params.templateId });
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.status(409).json({ error: 'Already favorited' });
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:templateId', auth, async (req, res) => {
  try {
    await db('favorites').where({ user_id: req.user.id, template_id: req.params.templateId }).del();
    res.json({ message: 'Removed from favorites' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
