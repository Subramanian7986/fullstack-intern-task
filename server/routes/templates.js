const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const templates = await db('templates').select('*');
    res.json(templates);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const template = await db('templates').where({ id: req.params.id }).first();
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json(template);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
