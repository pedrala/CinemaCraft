// scenarios.js

const express = require('express');
const router = express.Router();
const prisma = require('../dbClient.js');

router.get('/scenarios/:id', async (req, res) => {
  const scenarioId = parseInt(req.params.id);

  const scenario = await prisma.scenario.findUnique({
    where: { id: scenarioId },
    include: {
      breakdown: {
        include: {
          scenes: true,
        },
      },
    },
  });

  if (!scenario) {
    return res.status(404).json({ message: '시나리오를 찾을 수 없습니다.' });
  }

  res.json(scenario);
});

module.exports = router;