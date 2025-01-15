// UploadScenario.tsx

import React, { useState } from 'react';

function UploadScenario() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    // Wasp의 동작을 위한 fetch 요청
    await fetch('/api/uploadScenario', {
      method: 'POST',
      body: formData,
    });

    // 업로드 후 처리
    alert('업로드 완료');
  };

  return (
    <div>
      <h1>시나리오 업로드</h1>
      <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
}

export default UploadScenario;