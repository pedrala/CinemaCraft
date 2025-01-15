// ScenarioDetail.tsx

import React, { useEffect, useState } from 'react';

interface Scene {
  id: number;
  number: number;
  location: string;
  time: string;
  interiorExterior: string; // Enum 타입이면 다른 타입으로 변경
  description?: string;
}

interface Breakdown {
  scenes: Scene[];
}

interface Scenario {
  id: number;
  title: string;
  description?: string;
  filePath: string;
  uploadedAt: string; // Date 타입 사용 시 Date로 변경
  breakdown?: Breakdown;
}

interface ScenarioDetailProps {
  scenarioId: string; // 또는 number, 데이터 타입에 따라 변경
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({ scenarioId }) => {
  const [scenario, setScenario] = useState<Scenario | null>(null);

  useEffect(() => {
    // 시나리오 및 브레이크다운 정보 가져오기
    const fetchScenario = async () => {
      const response = await fetch(`/api/scenarios/${scenarioId}`);
      const data = await response.json();
      setScenario(data);
    };

    fetchScenario();
  }, [scenarioId]);

  if (!scenario) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{scenario.title}</h1>
      <h2>브레이크다운 결과</h2>
      {scenario.breakdown && scenario.breakdown.scenes.length > 0 ? (
        <ul>
          {scenario.breakdown.scenes.map((scene) => (
            <li key={scene.id}>
              장면 {scene.number}: {scene.location} - {scene.time} - {scene.interiorExterior}
              <p>{scene.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>브레이크다운 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default ScenarioDetail;