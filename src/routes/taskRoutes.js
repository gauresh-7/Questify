// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, xp_reward } = req.body;
    await pool.query(
      'INSERT INTO tasks (title, xp_reward) VALUES ($1, $2)',
      [title, xp_reward]
    );
    res.json({ message: 'Task added!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
