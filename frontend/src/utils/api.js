const API_BASE = '/api';

export async function analyzeAccount(data) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch(e) {
      throw new Error('Analiz sırasında bir hata oluştu');
    }
    throw new Error(error.message || 'Analiz sırasında bir hata oluştu');
  }
  return response.json();
}
