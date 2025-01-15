// uploadScenario.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const prisma = require('../dbClient.js');
const axios = require('axios');

const upload = multer({ dest: 'uploads/' });

router.post('/uploadScenario', upload.single('file'), async (req, res) => {
  const file = req.file;
  const { originalname, path } = file;

  // 시나리오 엔티티 생성
  const scenario = await prisma.scenario.create({
    data: {
      title: originalname,
      filePath: path,
      uploadedAt: new Date(),
    },
  });

  // NLP 서비스 호출하여 자동 브레이크다운 실행 (추후 구현)
  // 파일 내용을 읽어서 NLP 서비스에 전달

  const fs = require('fs');
  const fileContent = fs.readFileSync(path, 'utf-8');

  try {

    const nlpResponse = await axios.post('http://localhost:8000/analyze', fileContent, {
      headers: { 'Content-Type': 'text/plain' },
    });

    const { scenes } = nlpResponse.data;

    // 데이터베이스에 브레이크다운 결과 저장
    const breakdown = await prisma.breakdown.create({
      data: {
        scenario: { connect: { id: scenario.id } },
        scenes: {
          create: scenes.map((scene) => ({
            number: scene.number,
            location: scene.location,
            time: scene.time,
            interiorExterior: scene.interiorExterior,
            description: scene.description,
          })),
        },
      },
    });

  res.status(200).json({ message: '시나리오 업로드 완료', scenarioId: scenario.id });
}catch (error) {

    console.error('NLP 서비스 호출 오류:', error);

    res.status(500).json({ message: '시나리오 분석 중 오류 발생' });

  }

});

module.exports = router;